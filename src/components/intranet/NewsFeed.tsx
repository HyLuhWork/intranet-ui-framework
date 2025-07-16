import React from 'react';
import { useNode } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Calendar, User, Heart, MessageCircle, Share2 } from 'lucide-react';

declare module '@craftjs/core' {
  interface ComponentEvents {
    selected: boolean;
  }
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  likes: number;
  comments: number;
}

interface NewsFeedProps {
  title?: string;
  items?: NewsItem[];
  showImages?: boolean;
  showStats?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  maxItems?: number;
}

const defaultItems: NewsItem[] = [
  {
    id: '1',
    title: 'Nova política de trabalho remoto aprovada',
    summary: 'A empresa aprovou novas diretrizes para trabalho remoto, oferecendo mais flexibilidade aos colaboradores.',
    author: 'Maria Santos',
    date: '2024-01-15',
    category: 'RH',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop',
    likes: 24,
    comments: 8
  },
  {
    id: '2',
    title: 'Resultados do Q4 2023',
    summary: 'Confira os principais resultados da empresa no último trimestre de 2023.',
    author: 'Carlos Oliveira',
    date: '2024-01-14',
    category: 'Financeiro',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
    likes: 18,
    comments: 5
  },
  {
    id: '3',
    title: 'Novo sistema de gestão de projetos',
    summary: 'Implementação do novo sistema para melhor organização e acompanhamento de projetos.',
    author: 'Ana Costa',
    date: '2024-01-13',
    category: 'Tecnologia',
    likes: 31,
    comments: 12
  }
];

export const NewsFeed: React.FC<NewsFeedProps> = ({
  title = "Notícias Recentes",
  items = defaultItems,
  showImages = true,
  showStats = true,
  variant = "default",
  maxItems = 5
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

  const displayItems = items.slice(0, maxItems);

  const variantStyles = {
    default: "space-y-4",
    compact: "space-y-2",
    detailed: "space-y-6"
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`p-6 bg-card rounded-lg border border-border shadow-design-sm ${selected ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-design-lg font-inter font-bold text-card-foreground">
          {title}
        </h2>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
          Ver todas
        </Button>
      </div>
      
      <div className={variantStyles[variant]}>
        {displayItems.map((item) => (
          <div
            key={item.id}
            className={`
              border border-border rounded-lg p-4 hover:shadow-design-md transition-shadow duration-200
              ${variant === 'compact' ? 'py-3' : ''}
            `}
          >
            <div className="flex gap-4">
              {showImages && item.image && variant !== 'compact' && (
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-inter font-semibold text-card-foreground ${variant === 'compact' ? 'text-design-sm' : 'text-design-base'}`}>
                    {item.title}
                  </h3>
                  <Badge variant="secondary" className="text-design-xs shrink-0 ml-2">
                    {item.category}
                  </Badge>
                </div>
                
                {variant !== 'compact' && (
                  <p className="text-design-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.summary}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span className="text-design-xs">{item.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-design-xs">{formatDate(item.date)}</span>
                    </div>
                  </div>
                  
                  {showStats && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span className="text-design-xs">{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-design-xs">{item.comments}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Craft.js Settings Panel
export const NewsFeedSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Settings className="h-4 w-4" />
        <span className="text-design-sm font-medium">Configurações do Feed</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-design-xs-medium block mb-1">TÍTULO</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.title || ''}
            onChange={(e) => setProp((props: NewsFeedProps) => props.title = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">VARIANTE</label>
          <select
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.variant || 'default'}
            onChange={(e) => setProp((props: NewsFeedProps) => props.variant = e.target.value as 'default' | 'compact' | 'detailed')}
          >
            <option value="default">Padrão</option>
            <option value="compact">Compacto</option>
            <option value="detailed">Detalhado</option>
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
            onChange={(e) => setProp((props: NewsFeedProps) => props.maxItems = parseInt(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showImages"
              checked={props.showImages !== false}
              onChange={(e) => setProp((props: NewsFeedProps) => props.showImages = e.target.checked)}
            />
            <label htmlFor="showImages" className="text-design-sm">Mostrar imagens</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showStats"
              checked={props.showStats !== false}
              onChange={(e) => setProp((props: NewsFeedProps) => props.showStats = e.target.checked)}
            />
            <label htmlFor="showStats" className="text-design-sm">Mostrar estatísticas</label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Craft.js configuration
(NewsFeed as any).craft = {
  props: {
    title: "Notícias Recentes",
    items: defaultItems,
    showImages: true,
    showStats: true,
    variant: "default",
    maxItems: 5
  },
  related: {
    settings: NewsFeedSettings
  }
};