import React from 'react';
import { useNode } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Calendar, User, ChevronRight } from 'lucide-react';

declare module '@craftjs/core' {
  interface ComponentEvents {
    selected: boolean;
  }
}

interface AnnouncementCardProps {
  title?: string;
  content?: string;
  author?: string;
  date?: string;
  category?: string;
  urgent?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
  variant?: 'default' | 'urgent' | 'info';
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title = "Comunicado Importante",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  author = "João Silva",
  date = "2024-01-15",
  category = "Geral",
  urgent = false,
  showAuthor = true,
  showDate = true,
  showCategory = true,
  variant = "default"
}) => {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const variantStyles = {
    default: "border-border bg-card hover:shadow-design-md",
    urgent: "border-destructive bg-destructive/5 hover:shadow-design-md",
    info: "border-info bg-info/5 hover:shadow-design-md"
  };

  const badgeVariants = {
    default: "bg-primary text-primary-foreground",
    urgent: "bg-destructive text-destructive-foreground",
    info: "bg-info text-info-foreground"
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`
        p-6 rounded-lg border-2 transition-shadow duration-200 cursor-pointer
        ${variantStyles[variant]}
        ${selected ? 'ring-2 ring-primary' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-design-base font-inter font-semibold text-card-foreground mb-2">
            {title}
          </h3>
          
          <div className="flex items-center space-x-3 text-muted-foreground">
            {showAuthor && (
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span className="text-design-sm">{author}</span>
              </div>
            )}
            
            {showDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span className="text-design-sm">{formatDate(date)}</span>
              </div>
            )}
          </div>
        </div>
        
        {showCategory && (
          <Badge className={`${badgeVariants[variant]} text-design-xs`}>
            {urgent ? "URGENTE" : category}
          </Badge>
        )}
      </div>
      
      <p className="text-design-sm text-muted-foreground mb-4 line-clamp-3">
        {content}
      </p>
      
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
          Ler mais
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Craft.js Settings Panel
export const AnnouncementCardSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Settings className="h-4 w-4" />
        <span className="text-design-sm font-medium">Configurações do Comunicado</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-design-xs-medium block mb-1">TÍTULO</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.title || ''}
            onChange={(e) => setProp((props: AnnouncementCardProps) => props.title = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">CONTEÚDO</label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            rows={4}
            value={props.content || ''}
            onChange={(e) => setProp((props: AnnouncementCardProps) => props.content = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">AUTOR</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.author || ''}
            onChange={(e) => setProp((props: AnnouncementCardProps) => props.author = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">DATA</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.date || ''}
            onChange={(e) => setProp((props: AnnouncementCardProps) => props.date = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">CATEGORIA</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.category || ''}
            onChange={(e) => setProp((props: AnnouncementCardProps) => props.category = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">VARIANTE</label>
          <select
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.variant || 'default'}
            onChange={(e) => setProp((props: AnnouncementCardProps) => props.variant = e.target.value as 'default' | 'urgent' | 'info')}
          >
            <option value="default">Padrão</option>
            <option value="urgent">Urgente</option>
            <option value="info">Informativo</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="urgent"
              checked={props.urgent || false}
              onChange={(e) => setProp((props: AnnouncementCardProps) => props.urgent = e.target.checked)}
            />
            <label htmlFor="urgent" className="text-design-sm">Urgente</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showAuthor"
              checked={props.showAuthor !== false}
              onChange={(e) => setProp((props: AnnouncementCardProps) => props.showAuthor = e.target.checked)}
            />
            <label htmlFor="showAuthor" className="text-design-sm">Mostrar autor</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showDate"
              checked={props.showDate !== false}
              onChange={(e) => setProp((props: AnnouncementCardProps) => props.showDate = e.target.checked)}
            />
            <label htmlFor="showDate" className="text-design-sm">Mostrar data</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showCategory"
              checked={props.showCategory !== false}
              onChange={(e) => setProp((props: AnnouncementCardProps) => props.showCategory = e.target.checked)}
            />
            <label htmlFor="showCategory" className="text-design-sm">Mostrar categoria</label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Craft.js configuration
(AnnouncementCard as any).craft = {
  props: {
    title: "Comunicado Importante",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "João Silva",
    date: "2024-01-15",
    category: "Geral",
    urgent: false,
    showAuthor: true,
    showDate: true,
    showCategory: true,
    variant: "default"
  },
  related: {
    settings: AnnouncementCardSettings
  }
};