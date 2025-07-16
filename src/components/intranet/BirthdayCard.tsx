import React from 'react';
import { useNode } from '@craftjs/core';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, Gift, Cake, Calendar, Users } from 'lucide-react';

declare module '@craftjs/core' {
  interface ComponentEvents {
    selected: boolean;
  }
}

interface BirthdayPerson {
  id: string;
  name: string;
  department: string;
  date: string;
  avatar?: string;
  age?: number;
}

interface BirthdayCardProps {
  title?: string;
  people?: BirthdayPerson[];
  variant?: 'birthday' | 'anniversary' | 'new-hire';
  showAvatars?: boolean;
  showDepartment?: boolean;
  maxItems?: number;
}

const defaultPeople: BirthdayPerson[] = [
  {
    id: '1',
    name: 'Ana Silva',
    department: 'Marketing',
    date: '2024-01-16',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b40479?w=100&h=100&fit=crop&crop=face',
    age: 28
  },
  {
    id: '2',
    name: 'Carlos Santos',
    department: 'Desenvolvimento',
    date: '2024-01-17',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    age: 32
  },
  {
    id: '3',
    name: 'Marina Costa',
    department: 'RH',
    date: '2024-01-18',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    age: 29
  }
];

export const BirthdayCard: React.FC<BirthdayCardProps> = ({
  title = "Aniversariantes da Semana",
  people = defaultPeople,
  variant = "birthday",
  showAvatars = true,
  showDepartment = true,
  maxItems = 5
}) => {
  // Conditionally use Craft.js hooks only when in editor context
  let connect: any, drag: any, selected = false;
  
  try {
    const node = useNode((state) => ({
      selected: state.events.selected,
    }));
    connect = node.connectors.connect;
    drag = node.connectors.drag;
    selected = node.selected;
  } catch (error) {
    // Not in Craft.js context, use regular div
    connect = drag = (ref: any) => ref;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const getVariantConfig = () => {
    switch (variant) {
      case 'birthday':
        return {
          icon: Cake,
          color: 'bg-accent text-accent-foreground',
          bgColor: 'bg-accent/10 border-accent',
          emptyMessage: 'Nenhum aniversário esta semana'
        };
      case 'anniversary':
        return {
          icon: Gift,
          color: 'bg-primary text-primary-foreground',
          bgColor: 'bg-primary/10 border-primary',
          emptyMessage: 'Nenhum aniversário de empresa esta semana'
        };
      case 'new-hire':
        return {
          icon: Users,
          color: 'bg-success text-success-foreground',
          bgColor: 'bg-success/10 border-success',
          emptyMessage: 'Nenhum novo colaborador esta semana'
        };
      default:
        return {
          icon: Cake,
          color: 'bg-accent text-accent-foreground',
          bgColor: 'bg-accent/10 border-accent',
          emptyMessage: 'Nenhum item encontrado'
        };
    }
  };

  const config = getVariantConfig();
  const IconComponent = config.icon;
  const displayPeople = people.slice(0, maxItems);

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`p-6 bg-card rounded-lg border-2 shadow-design-sm ${config.bgColor} ${selected ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${config.color}`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <h3 className="text-design-base font-inter font-semibold text-card-foreground">
            {title}
          </h3>
        </div>
        <Badge variant="secondary" className="text-design-xs">
          {displayPeople.length}
        </Badge>
      </div>

      {displayPeople.length === 0 ? (
        <p className="text-design-sm text-muted-foreground text-center py-8">
          {config.emptyMessage}
        </p>
      ) : (
        <div className="space-y-3">
          {displayPeople.map((person) => (
            <div
              key={person.id}
              className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border hover:shadow-design-sm transition-shadow duration-200"
            >
              {showAvatars && person.avatar && (
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-design-sm font-inter font-medium text-card-foreground">
                      {person.name}
                      {variant === 'birthday' && person.age && (
                        <span className="text-muted-foreground ml-2">
                          ({person.age} anos)
                        </span>
                      )}
                    </h4>
                    {showDepartment && (
                      <p className="text-design-xs text-muted-foreground">
                        {person.department}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span className="text-design-xs">{formatDate(person.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {displayPeople.length > 0 && (
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
            Ver todos
          </Button>
        </div>
      )}
    </div>
  );
};

// Craft.js Settings Panel
export const BirthdayCardSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Settings className="h-4 w-4" />
        <span className="text-design-sm font-medium">Configurações do Card</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-design-xs-medium block mb-1">TÍTULO</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.title || ''}
            onChange={(e) => setProp((props: BirthdayCardProps) => props.title = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">TIPO</label>
          <select
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.variant || 'birthday'}
            onChange={(e) => setProp((props: BirthdayCardProps) => props.variant = e.target.value as 'birthday' | 'anniversary' | 'new-hire')}
          >
            <option value="birthday">Aniversários</option>
            <option value="anniversary">Aniversários de Empresa</option>
            <option value="new-hire">Novos Colaboradores</option>
          </select>
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">MÁXIMO DE ITENS</label>
          <input
            type="number"
            min="1"
            max="10"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.maxItems || 5}
            onChange={(e) => setProp((props: BirthdayCardProps) => props.maxItems = parseInt(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showAvatars"
              checked={props.showAvatars !== false}
              onChange={(e) => setProp((props: BirthdayCardProps) => props.showAvatars = e.target.checked)}
            />
            <label htmlFor="showAvatars" className="text-design-sm">Mostrar avatares</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showDepartment"
              checked={props.showDepartment !== false}
              onChange={(e) => setProp((props: BirthdayCardProps) => props.showDepartment = e.target.checked)}
            />
            <label htmlFor="showDepartment" className="text-design-sm">Mostrar departamento</label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Craft.js configuration
(BirthdayCard as any).craft = {
  props: {
    title: "Aniversariantes da Semana",
    people: defaultPeople,
    variant: "birthday",
    showAvatars: true,
    showDepartment: true,
    maxItems: 5
  },
  related: {
    settings: BirthdayCardSettings
  }
};