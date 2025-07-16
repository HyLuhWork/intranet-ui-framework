import React from 'react';
import { useNode } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Eye, Star } from 'lucide-react';

declare module '@craftjs/core' {
  interface ComponentEvents {
    selected: boolean;
  }
}

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  badgeText?: string;
  backgroundImage?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  showBadge?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title = "Bem-vindo à Nossa Intranet",
  subtitle = "Conectando pessoas, compartilhando conhecimento",
  description = "Acesse todas as informações e ferramentas que você precisa para ser mais produtivo no seu dia a dia.",
  ctaText = "Explorar Agora",
  ctaLink = "#",
  badgeText = "Novo",
  backgroundImage = "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&h=600&fit=crop",
  variant = "primary",
  showBadge = true
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

  const variantStyles = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground"
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`relative overflow-hidden rounded-lg shadow-design-lg ${selected ? 'ring-2 ring-primary' : ''}`}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${variantStyles[variant]} bg-opacity-80`} />
      
      {/* Content */}
      <div className="relative z-10 px-8 py-16 text-center">
        {showBadge && (
          <Badge className="mb-4 bg-accent text-accent-foreground">
            <Star className="mr-1 h-3 w-3" />
            {badgeText}
          </Badge>
        )}
        
        <h1 className="text-design-xl font-inter mb-4 max-w-3xl mx-auto">
          {title}
        </h1>
        
        <p className="text-design-lg font-inter mb-6 max-w-2xl mx-auto opacity-90">
          {subtitle}
        </p>
        
        <p className="text-design-base font-inter mb-8 max-w-xl mx-auto opacity-80">
          {description}
        </p>
        
        <Button 
          size="lg" 
          className="bg-background text-foreground hover:bg-background/90 shadow-design-md"
          onClick={() => window.open(ctaLink, '_blank')}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};

// Craft.js Settings Panel
export const HeroBannerSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Settings className="h-4 w-4" />
        <span className="text-design-sm font-medium">Configurações do Banner</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-design-xs-medium block mb-1">TÍTULO</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.title || ''}
            onChange={(e) => setProp((props: HeroBannerProps) => props.title = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">SUBTÍTULO</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.subtitle || ''}
            onChange={(e) => setProp((props: HeroBannerProps) => props.subtitle = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">DESCRIÇÃO</label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            rows={3}
            value={props.description || ''}
            onChange={(e) => setProp((props: HeroBannerProps) => props.description = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">TEXTO DO BOTÃO</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.ctaText || ''}
            onChange={(e) => setProp((props: HeroBannerProps) => props.ctaText = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">VARIANTE</label>
          <select
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.variant || 'primary'}
            onChange={(e) => setProp((props: HeroBannerProps) => props.variant = e.target.value as 'primary' | 'secondary' | 'accent')}
          >
            <option value="primary">Primário</option>
            <option value="secondary">Secundário</option>
            <option value="accent">Destaque</option>
          </select>
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">IMAGEM DE FUNDO</label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.backgroundImage || ''}
            onChange={(e) => setProp((props: HeroBannerProps) => props.backgroundImage = e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showBadge"
            checked={props.showBadge || false}
            onChange={(e) => setProp((props: HeroBannerProps) => props.showBadge = e.target.checked)}
          />
          <label htmlFor="showBadge" className="text-design-sm">Mostrar badge</label>
        </div>
      </div>
    </div>
  );
};

// Craft.js configuration
(HeroBanner as any).craft = {
  props: {
    title: "Bem-vindo à Nossa Intranet",
    subtitle: "Conectando pessoas, compartilhando conhecimento",
    description: "Acesse todas as informações e ferramentas que você precisa para ser mais produtivo no seu dia a dia.",
    ctaText: "Explorar Agora",
    ctaLink: "#",
    badgeText: "Novo",
    backgroundImage: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&h=600&fit=crop",
    variant: "primary",
    showBadge: true
  },
  related: {
    settings: HeroBannerSettings
  }
};