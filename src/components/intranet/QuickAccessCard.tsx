import React from 'react';
import { useNode } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, ExternalLink, Star } from 'lucide-react';

declare module '@craftjs/core' {
  interface ComponentEvents {
    selected: boolean;
  }
}

interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  color?: string;
  featured?: boolean;
  category?: string;
}

interface QuickAccessCardProps {
  title?: string;
  items?: QuickAccessItem[];
  layout?: 'grid' | 'list';
  showDescriptions?: boolean;
  showCategories?: boolean;
  maxItems?: number;
  variant?: 'default' | 'compact' | 'featured';
}

const defaultItems: QuickAccessItem[] = [
  {
    id: '1',
    title: 'Portal RH',
    description: 'Acesse informações sobre benefícios, folha de pagamento e documentos',
    url: '#',
    icon: '👥',
    color: 'bg-primary text-primary-foreground',
    featured: true,
    category: 'RH'
  },
  {
    id: '2',
    title: 'Sistema de Projetos',
    description: 'Gerencie seus projetos e acompanhe o progresso das tarefas',
    url: '#',
    icon: '📊',
    color: 'bg-accent text-accent-foreground',
    featured: false,
    category: 'Produtividade'
  },
  {
    id: '3',
    title: 'Central de Suporte',
    description: 'Abra tickets de suporte e acompanhe o status dos chamados',
    url: '#',
    icon: '🎧',
    color: 'bg-info text-info-foreground',
    featured: false,
    category: 'Suporte'
  },
  {
    id: '4',
    title: 'Biblioteca Digital',
    description: 'Acesse documentos, manuais e recursos da empresa',
    url: '#',
    icon: '📚',
    color: 'bg-success text-success-foreground',
    featured: true,
    category: 'Recursos'
  }
];

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  title = "Acesso Rápido",
  items = defaultItems,
  layout = "grid",
  showDescriptions = true,
  showCategories = true,
  maxItems = 6,
  variant = "default"
}) => {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const displayItems = items.slice(0, maxItems);

  const getLayoutClasses = () => {
    if (layout === 'grid') {
      return variant === 'compact' 
        ? 'grid grid-cols-2 sm:grid-cols-3 gap-3' 
        : 'grid grid-cols-1 sm:grid-cols-2 gap-4';
    }
    return 'space-y-3';
  };

  const getItemClasses = (item: QuickAccessItem) => {
    const baseClasses = "p-4 rounded-lg border border-border hover:shadow-design-md transition-all duration-200 cursor-pointer group";
    
    if (variant === 'featured' && item.featured) {
      return `${baseClasses} bg-gradient-to-br from-primary/10 to-accent/10 border-primary`;
    }
    
    return `${baseClasses} bg-card hover:scale-[1.02]`;
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`p-6 bg-card rounded-lg border border-border shadow-design-sm ${selected ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-design-lg font-inter font-bold text-card-foreground">
          {title}
        </h3>
        <Badge variant="secondary" className="text-design-xs">
          {displayItems.length} sistemas
        </Badge>
      </div>

      {displayItems.length === 0 ? (
        <p className="text-design-sm text-muted-foreground text-center py-8">
          Nenhum sistema disponível
        </p>
      ) : (
        <div className={getLayoutClasses()}>
          {displayItems.map((item) => (
            <div
              key={item.id}
              className={getItemClasses(item)}
              onClick={() => window.open(item.url, '_blank')}
            >
              <div className="flex items-start space-x-3">
                {item.icon && (
                  <div className={`p-2 rounded-lg ${item.color || 'bg-muted'} flex-shrink-0`}>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-design-base font-inter font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {variant === 'featured' && item.featured && (
                        <Star className="h-4 w-4 text-primary fill-primary" />
                      )}
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  
                  {showDescriptions && variant !== 'compact' && (
                    <p className="text-design-sm text-muted-foreground mb-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  
                  {showCategories && item.category && (
                    <Badge variant="outline" className="text-design-xs">
                      {item.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {displayItems.length > 0 && (
        <div className="mt-6 text-center">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
            Ver todos os sistemas
          </Button>
        </div>
      )}
    </div>
  );
};

// Craft.js Settings Panel
export const QuickAccessCardSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Settings className="h-4 w-4" />
        <span className="text-design-sm font-medium">Configurações do Acesso Rápido</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-design-xs-medium block mb-1">TÍTULO</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.title || ''}
            onChange={(e) => setProp((props: QuickAccessCardProps) => props.title = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">LAYOUT</label>
          <select
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.layout || 'grid'}
            onChange={(e) => setProp((props: QuickAccessCardProps) => props.layout = e.target.value as 'grid' | 'list')}
          >
            <option value="grid">Grade</option>
            <option value="list">Lista</option>
          </select>
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">VARIANTE</label>
          <select
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.variant || 'default'}
            onChange={(e) => setProp((props: QuickAccessCardProps) => props.variant = e.target.value as 'default' | 'compact' | 'featured')}
          >
            <option value="default">Padrão</option>
            <option value="compact">Compacto</option>
            <option value="featured">Com Destaques</option>
          </select>
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">MÁXIMO DE ITENS</label>
          <input
            type="number"
            min="1"
            max="12"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.maxItems || 6}
            onChange={(e) => setProp((props: QuickAccessCardProps) => props.maxItems = parseInt(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showDescriptions"
              checked={props.showDescriptions !== false}
              onChange={(e) => setProp((props: QuickAccessCardProps) => props.showDescriptions = e.target.checked)}
            />
            <label htmlFor="showDescriptions" className="text-design-sm">Mostrar descrições</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showCategories"
              checked={props.showCategories !== false}
              onChange={(e) => setProp((props: QuickAccessCardProps) => props.showCategories = e.target.checked)}
            />
            <label htmlFor="showCategories" className="text-design-sm">Mostrar categorias</label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Craft.js configuration
(QuickAccessCard as any).craft = {
  props: {
    title: "Acesso Rápido",
    items: defaultItems,
    layout: "grid",
    showDescriptions: true,
    showCategories: true,
    maxItems: 6,
    variant: "default"
  },
  related: {
    settings: QuickAccessCardSettings
  }
};