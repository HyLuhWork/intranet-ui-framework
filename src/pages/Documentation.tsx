import React, { useState } from 'react';
import { HeroBanner } from '@/components/intranet/HeroBanner';
import { AnnouncementCard } from '@/components/intranet/AnnouncementCard';
import { NewsFeed } from '@/components/intranet/NewsFeed';
import { BirthdayCard } from '@/components/intranet/BirthdayCard';
import { QuickAccessCard } from '@/components/intranet/QuickAccessCard';
import { OrganizationalStructure } from '@/components/intranet/OrganizationalStructure';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Palette, 
  Component, 
  Code, 
  Eye,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introducao');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['componentes']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuItems = [
    {
      id: 'introducao',
      title: 'Introdução',
      icon: Book,
      children: [
        { id: 'getting-started', title: 'Primeiros Passos' },
        { id: 'tokens', title: 'Tokens de Design' },
        { id: 'principles', title: 'Princípios' }
      ]
    },
    {
      id: 'design-system',
      title: 'Design System',
      icon: Palette,
      children: [
        { id: 'colors', title: 'Cores' },
        { id: 'typography', title: 'Tipografia' },
        { id: 'shadows', title: 'Sombras' }
      ]
    },
    {
      id: 'componentes',
      title: 'Componentes',
      icon: Component,
      children: [
        { id: 'hero-banner', title: 'Banner Principal' },
        { id: 'announcement-card', title: 'Card de Comunicado' },
        { id: 'news-feed', title: 'Feed de Notícias' },
        { id: 'birthday-card', title: 'Card de Aniversário' },
        { id: 'quick-access', title: 'Acesso Rápido' },
        { id: 'organizational-structure', title: 'Estrutura Organizacional' }
      ]
    }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'introducao':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-design-xl font-inter font-bold mb-4">
                Sistema de Design para Intranet
              </h1>
              <p className="text-design-base text-muted-foreground mb-6">
                Bem-vindo ao sistema de design completo para aplicações de intranet. 
                Este guia contém todos os componentes, padrões e diretrizes necessárias 
                para criar interfaces consistentes e eficientes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <Component className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-design-base font-semibold mb-1">30+ Componentes</h3>
                  <p className="text-design-sm text-muted-foreground">
                    Componentes prontos para uso em intranet
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <Code className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-design-base font-semibold mb-1">TypeScript</h3>
                  <p className="text-design-sm text-muted-foreground">
                    Totalmente tipado para maior segurança
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <Eye className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-design-base font-semibold mb-1">Craft.js</h3>
                  <p className="text-design-sm text-muted-foreground">
                    Editor visual integrado
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'tokens':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-design-xl font-inter font-bold mb-4">Tokens de Design</h1>
              <p className="text-design-base text-muted-foreground mb-6">
                Os tokens de design são a base do nosso sistema, garantindo consistência 
                visual em toda a aplicação.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Tipografia</h2>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                      <span className="text-design-xs font-mono bg-muted px-2 py-1 rounded">text-design-xs</span>
                      <span className="text-design-xs">Texto extra pequeno - 12px</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                      <span className="text-design-xs font-mono bg-muted px-2 py-1 rounded">text-design-sm</span>
                      <span className="text-design-sm">Texto pequeno - 14px</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                      <span className="text-design-xs font-mono bg-muted px-2 py-1 rounded">text-design-base</span>
                      <span className="text-design-base">Texto base - 16px</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                      <span className="text-design-xs font-mono bg-muted px-2 py-1 rounded">text-design-lg</span>
                      <span className="text-design-lg">Texto grande - 18px</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                      <span className="text-design-xs font-mono bg-muted px-2 py-1 rounded">text-design-xl</span>
                      <span className="text-design-xl">Texto extra grande - 20px</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Sombras</h2>
                  <div className="space-y-3">
                    <div className="p-4 bg-card border border-border rounded-lg shadow-design-sm">
                      <span className="text-design-xs font-mono bg-muted px-2 py-1 rounded">shadow-design-sm</span>
                      <p className="text-design-sm text-muted-foreground mt-2">Sombra pequena</p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg shadow-design-md">
                      <span className="text-design-xs font-mono bg-muted px-2 py-1 rounded">shadow-design-md</span>
                      <p className="text-design-sm text-muted-foreground mt-2">Sombra média</p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg shadow-design-lg">
                      <span className="text-design-xs font-mono bg-muted px-2 py-1 rounded">shadow-design-lg</span>
                      <p className="text-design-sm text-muted-foreground mt-2">Sombra grande</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'hero-banner':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-design-xl font-inter font-bold mb-4">Banner Principal</h1>
              <p className="text-design-base text-muted-foreground mb-6">
                O Banner Principal é usado para destacar informações importantes ou 
                dar boas-vindas aos usuários na página inicial da intranet.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Exemplo</h2>
                  <HeroBanner />
                </div>
                
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Propriedades</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Propriedade</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Tipo</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Padrão</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">title</td>
                          <td className="border border-border px-4 py-2 text-design-sm">string</td>
                          <td className="border border-border px-4 py-2 text-design-sm">"Bem-vindo..."</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Título principal do banner</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">subtitle</td>
                          <td className="border border-border px-4 py-2 text-design-sm">string</td>
                          <td className="border border-border px-4 py-2 text-design-sm">"Conectando pessoas..."</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Subtítulo do banner</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">variant</td>
                          <td className="border border-border px-4 py-2 text-design-sm">'primary' | 'secondary' | 'accent'</td>
                          <td className="border border-border px-4 py-2 text-design-sm">'primary'</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Variante visual do banner</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Código</h2>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-design-sm text-muted-foreground overflow-x-auto">
{`<HeroBanner
  title="Bem-vindo à Nossa Intranet"
  subtitle="Conectando pessoas, compartilhando conhecimento"
  variant="primary"
  showBadge={true}
/>`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'birthday-card':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-design-xl font-inter font-bold mb-4">Card de Aniversário</h1>
              <p className="text-design-base text-muted-foreground mb-6">
                O Card de Aniversário exibe informações sobre aniversariantes, 
                aniversários de empresa ou novos colaboradores de forma visual e organizada.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Exemplos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BirthdayCard />
                    <BirthdayCard variant="anniversary" title="Aniversários de Empresa" />
                  </div>
                  <div className="mt-4">
                    <BirthdayCard variant="new-hire" title="Novos Colaboradores" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Variantes</h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-accent text-accent-foreground">birthday</Badge>
                      <span className="text-design-sm">Aniversários pessoais</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-primary text-primary-foreground">anniversary</Badge>
                      <span className="text-design-sm">Aniversários de empresa</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-success text-success-foreground">new-hire</Badge>
                      <span className="text-design-sm">Novos colaboradores</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'quick-access':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-design-xl font-inter font-bold mb-4">Acesso Rápido</h1>
              <p className="text-design-base text-muted-foreground mb-6">
                O componente de Acesso Rápido fornece links diretos para sistemas 
                e ferramentas importantes da empresa de forma organizada e visual.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Exemplos</h2>
                  <div className="space-y-4">
                    <QuickAccessCard />
                    <QuickAccessCard variant="compact" layout="grid" />
                    <QuickAccessCard variant="featured" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Tipos de Personalização do Acesso Rápido</h2>
                  <p className="text-design-base text-muted-foreground mb-4">
                    O componente de Acesso Rápido oferece diversas opções de personalização para atender às necessidades do seu projeto:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-design-base font-inter font-semibold">Layout e Apresentação</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">layout</Badge>
                          <span className="text-design-sm">"grid" | "list" - Grade ou lista vertical</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">variant</Badge>
                          <span className="text-design-sm">"default" | "compact" | "featured" - Estilos diferentes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">maxItems</Badge>
                          <span className="text-design-sm">Quantidade máxima de itens exibidos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">colunas</Badge>
                          <span className="text-design-sm">Grid responsivo com máximo de 3 colunas</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-design-base font-inter font-semibold">Controle de Conteúdo</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">showDescriptions</Badge>
                          <span className="text-design-sm">Mostrar/ocultar descrições dos itens</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">showCategories</Badge>
                          <span className="text-design-sm">Mostrar/ocultar badges de categoria</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">title</Badge>
                          <span className="text-design-sm">Título personalizado do cartão</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">items</Badge>
                          <span className="text-design-sm">Array de itens personalizados</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                    <h4 className="text-design-base font-inter font-semibold mb-2">💡 Dica para Desenvolvedores</h4>
                    <p className="text-design-sm text-muted-foreground">
                      Use o painel de propriedades do Craft.js para ajustar todas essas configurações visualmente, 
                      ou configure as props diretamente no código. Cada item pode ter ícone, cor, categoria e status de destaque.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Código Completo</h2>
                  <p className="text-design-base text-muted-foreground mb-4">
                    Aqui está o código completo do componente, pronto para uso no seu projeto Next.js com Craft.js:
                  </p>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-design-sm text-muted-foreground overflow-x-auto whitespace-pre-wrap">
{`// components/QuickAccessCard.tsx
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
      return \`\${baseClasses} bg-gradient-to-br from-primary/10 to-accent/10 border-primary\`;
    }
    
    return \`\${baseClasses} bg-card hover:scale-[1.02]\`;
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={\`p-6 bg-card rounded-lg border border-border shadow-design-sm \${selected ? 'ring-2 ring-primary' : ''}\`}
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
                  <div className={\`p-2 rounded-lg \${item.color || 'bg-muted'} flex-shrink-0\`}>
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
};`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Como Usar</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-design-base font-semibold mb-2">1. Importação Básica</h3>
                      <div className="bg-muted p-3 rounded-lg">
                        <pre className="text-design-sm text-muted-foreground">
{`import { QuickAccessCard } from '@/components/QuickAccessCard';

// Uso básico
<QuickAccessCard />`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-design-base font-semibold mb-2">2. Customização Avançada</h3>
                      <div className="bg-muted p-3 rounded-lg">
                        <pre className="text-design-sm text-muted-foreground">
{`// Dados customizados
const meusSistemas = [
  {
    id: '1',
    title: 'Meu Sistema',
    description: 'Descrição do sistema',
    url: 'https://sistema.com',
    icon: '🔧',
    color: 'bg-blue-500 text-white',
    featured: true,
    category: 'Ferramentas'
  }
];

<QuickAccessCard
  title="Meus Sistemas"
  items={meusSistemas}
  variant="featured"
  layout="grid"
  maxItems={8}
/>`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-design-base font-semibold mb-2">3. Craft.js Editor</h3>
                      <div className="bg-muted p-3 rounded-lg">
                        <pre className="text-design-sm text-muted-foreground">
{`import { Editor, Frame, Element } from '@craftjs/core';
import { QuickAccessCard } from '@/components/QuickAccessCard';

<Editor resolver={{ QuickAccessCard }}>
  <Frame>
    <Element is={QuickAccessCard} canvas />
  </Frame>
</Editor>`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Propriedades</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Propriedade</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Tipo</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Padrão</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">title</td>
                          <td className="border border-border px-4 py-2 text-design-sm">string</td>
                          <td className="border border-border px-4 py-2 text-design-sm">"Acesso Rápido"</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Título do componente</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">items</td>
                          <td className="border border-border px-4 py-2 text-design-sm">QuickAccessItem[]</td>
                          <td className="border border-border px-4 py-2 text-design-sm">defaultItems</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Array de sistemas para exibir</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">layout</td>
                          <td className="border border-border px-4 py-2 text-design-sm">'grid' | 'list'</td>
                          <td className="border border-border px-4 py-2 text-design-sm">'grid'</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Layout de exibição</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">variant</td>
                          <td className="border border-border px-4 py-2 text-design-sm">'default' | 'compact' | 'featured'</td>
                          <td className="border border-border px-4 py-2 text-design-sm">'default'</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Variante visual</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">maxItems</td>
                          <td className="border border-border px-4 py-2 text-design-sm">number</td>
                          <td className="border border-border px-4 py-2 text-design-sm">6</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Máximo de itens a exibir</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">showDescriptions</td>
                          <td className="border border-border px-4 py-2 text-design-sm">boolean</td>
                          <td className="border border-border px-4 py-2 text-design-sm">true</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Mostrar descrições dos itens</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">showCategories</td>
                          <td className="border border-border px-4 py-2 text-design-sm">boolean</td>
                          <td className="border border-border px-4 py-2 text-design-sm">true</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Mostrar categorias dos itens</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Recursos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="text-design-base font-semibold mb-2">✨ Responsivo</h4>
                      <p className="text-design-sm text-muted-foreground">
                        Adapta-se perfeitamente a diferentes tamanhos de tela
                      </p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="text-design-base font-semibold mb-2">🎨 Customizável</h4>
                      <p className="text-design-sm text-muted-foreground">
                        Múltiplas variantes e opções de personalização
                      </p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="text-design-base font-semibold mb-2">🔧 Craft.js</h4>
                      <p className="text-design-sm text-muted-foreground">
                        Painel de configuração completo para edição visual
                      </p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="text-design-base font-semibold mb-2">⚡ Performance</h4>
                      <p className="text-design-sm text-muted-foreground">
                        Otimizado para carregamento rápido e interações suaves
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'announcement-card':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-design-xl font-inter font-bold mb-4">Card de Comunicado</h1>
              <p className="text-design-base text-muted-foreground mb-6">
                O Card de Comunicado é usado para exibir avisos, comunicados e 
                informações importantes de forma destacada.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Exemplos</h2>
                  <div className="space-y-4">
                    <AnnouncementCard />
                    <AnnouncementCard variant="urgent" urgent={true} />
                    <AnnouncementCard variant="info" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Variantes</h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">default</Badge>
                      <span className="text-design-sm">Comunicado padrão</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive">urgent</Badge>
                      <span className="text-design-sm">Comunicado urgente</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-info text-info-foreground">info</Badge>
                      <span className="text-design-sm">Comunicado informativo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'news-feed':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-design-xl font-inter font-bold mb-4">Feed de Notícias</h1>
              <p className="text-design-base text-muted-foreground mb-6">
                O Feed de Notícias exibe uma lista de notícias e atualizações da empresa 
                de forma organizada e interativa.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Exemplo</h2>
                  <NewsFeed />
                </div>
                
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Variantes</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-design-base font-semibold mb-2">Compacto</h3>
                      <NewsFeed variant="compact" maxItems={3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'organizational-structure':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-design-xl font-inter font-bold mb-4">Estrutura Organizacional</h1>
              <p className="text-design-base text-muted-foreground mb-6">
                O componente de Estrutura Organizacional permite visualizar e gerenciar 
                a hierarquia organizacional da empresa com gestão integrada de documentos.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Exemplos</h2>
                  <div className="space-y-4">
                    <div className="border border-border rounded-lg p-4">
                      <p className="text-design-sm text-muted-foreground mb-4">
                        Demonstração do componente:
                      </p>
                      <OrganizationalStructure />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Tipos de Personalização da Estrutura Organizacional</h2>
                  <p className="text-design-base text-muted-foreground mb-4">
                    O componente de Estrutura Organizacional oferece diversas opções de personalização para atender às necessidades específicas:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-design-base font-inter font-semibold">Gestão de Hierarquia</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">structureData</Badge>
                          <span className="text-design-sm">Dados da estrutura hierárquica</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">expandable</Badge>
                          <span className="text-design-sm">Nós expansíveis com filhos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">dragDrop</Badge>
                          <span className="text-design-sm">Reorganização via drag and drop</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-design-base font-inter font-semibold">Gestão de Documentos</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">showDocuments</Badge>
                          <span className="text-design-sm">Ativar/desativar gestão de documentos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">showPeople</Badge>
                          <span className="text-design-sm">Mostrar pessoas vinculadas</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">defaultFolders</Badge>
                          <span className="text-design-sm">Pastas padrão para novos nós</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Propriedades</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Propriedade</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Tipo</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Padrão</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">title</td>
                          <td className="border border-border px-4 py-2 text-design-sm">string</td>
                          <td className="border border-border px-4 py-2 text-design-sm">"Estrutura Organizacional"</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Título do componente</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">showDocuments</td>
                          <td className="border border-border px-4 py-2 text-design-sm">boolean</td>
                          <td className="border border-border px-4 py-2 text-design-sm">true</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Exibe a gestão de documentos</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">showPeople</td>
                          <td className="border border-border px-4 py-2 text-design-sm">boolean</td>
                          <td className="border border-border px-4 py-2 text-design-sm">true</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Exibe pessoas vinculadas</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Propriedades</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Propriedade</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Tipo</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Padrão</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">title</td>
                          <td className="border border-border px-4 py-2 text-design-sm">string</td>
                          <td className="border border-border px-4 py-2 text-design-sm">"Estrutura Organizacional"</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Título do componente</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">showDocuments</td>
                          <td className="border border-border px-4 py-2 text-design-sm">boolean</td>
                          <td className="border border-border px-4 py-2 text-design-sm">true</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Exibe a gestão de documentos</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">showPeople</td>
                          <td className="border border-border px-4 py-2 text-design-sm">boolean</td>
                          <td className="border border-border px-4 py-2 text-design-sm">true</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Exibe pessoas vinculadas</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'announcement-card':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-design-xl font-inter font-bold mb-4">Card de Comunicado</h1>
              <p className="text-design-base text-muted-foreground mb-6">
                O Card de Comunicado é usado para exibir avisos, comunicados e 
                informações importantes para os usuários de forma destacada.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Exemplos</h2>
                  <div className="space-y-4">
                    <AnnouncementCard />
                    <AnnouncementCard variant="urgent" title="Manutenção Programada" 
                                     content="Sistema estará indisponível das 02:00 às 06:00 para manutenção." />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Código</h2>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-design-sm text-muted-foreground overflow-x-auto whitespace-pre-wrap">
{`// components/QuickAccessCard.tsx
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
      return \`\${baseClasses} bg-gradient-to-br from-primary/10 to-accent/10 border-primary\`;
    }
    
    return \`\${baseClasses} bg-card hover:scale-[1.02]\`;
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={\`p-6 bg-card rounded-lg border border-border shadow-design-sm \${selected ? 'ring-2 ring-primary' : ''}\`}
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
                  <div className={\`p-2 rounded-lg \${item.color || 'bg-muted'} flex-shrink-0\`}>
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
};`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Como Usar</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-design-base font-semibold mb-2">1. Importação Básica</h3>
                      <div className="bg-muted p-3 rounded-lg">
                        <pre className="text-design-sm text-muted-foreground">
{`import { QuickAccessCard } from '@/components/QuickAccessCard';

// Uso básico
<QuickAccessCard />`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-design-base font-semibold mb-2">2. Customização Avançada</h3>
                      <div className="bg-muted p-3 rounded-lg">
                        <pre className="text-design-sm text-muted-foreground">
{`// Dados customizados
const meusSistemas = [
  {
    id: '1',
    title: 'Meu Sistema',
    description: 'Descrição do sistema',
    url: 'https://sistema.com',
    icon: '🔧',
    color: 'bg-blue-500 text-white',
    featured: true,
    category: 'Ferramentas'
  }
];

<QuickAccessCard
  title="Meus Sistemas"
  items={meusSistemas}
  variant="featured"
  layout="grid"
  maxItems={8}
/>`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-design-base font-semibold mb-2">3. Craft.js Editor</h3>
                      <div className="bg-muted p-3 rounded-lg">
                        <pre className="text-design-sm text-muted-foreground">
{`import { Editor, Frame, Element } from '@craftjs/core';
import { QuickAccessCard } from '@/components/QuickAccessCard';

<Editor resolver={{ QuickAccessCard }}>
  <Frame>
    <Element is={QuickAccessCard} canvas />
  </Frame>
</Editor>`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Propriedades</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Propriedade</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Tipo</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Padrão</th>
                          <th className="border border-border px-4 py-2 text-left text-design-sm font-medium">Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">title</td>
                          <td className="border border-border px-4 py-2 text-design-sm">string</td>
                          <td className="border border-border px-4 py-2 text-design-sm">"Acesso Rápido"</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Título do componente</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">items</td>
                          <td className="border border-border px-4 py-2 text-design-sm">QuickAccessItem[]</td>
                          <td className="border border-border px-4 py-2 text-design-sm">defaultItems</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Array de sistemas para exibir</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">layout</td>
                          <td className="border border-border px-4 py-2 text-design-sm">'grid' | 'list'</td>
                          <td className="border border-border px-4 py-2 text-design-sm">'grid'</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Layout de exibição</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">variant</td>
                          <td className="border border-border px-4 py-2 text-design-sm">'default' | 'compact' | 'featured'</td>
                          <td className="border border-border px-4 py-2 text-design-sm">'default'</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Variante visual</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">maxItems</td>
                          <td className="border border-border px-4 py-2 text-design-sm">number</td>
                          <td className="border border-border px-4 py-2 text-design-sm">6</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Máximo de itens a exibir</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">showDescriptions</td>
                          <td className="border border-border px-4 py-2 text-design-sm">boolean</td>
                          <td className="border border-border px-4 py-2 text-design-sm">true</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Mostrar descrições dos itens</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2 text-design-sm font-mono">showCategories</td>
                          <td className="border border-border px-4 py-2 text-design-sm">boolean</td>
                          <td className="border border-border px-4 py-2 text-design-sm">true</td>
                          <td className="border border-border px-4 py-2 text-design-sm">Mostrar categorias dos itens</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-design-lg font-inter font-bold mb-4">Recursos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="text-design-base font-semibold mb-2">✨ Responsivo</h4>
                      <p className="text-design-sm text-muted-foreground">
                        Adapta-se perfeitamente a diferentes tamanhos de tela
                      </p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="text-design-base font-semibold mb-2">🎨 Customizável</h4>
                      <p className="text-design-sm text-muted-foreground">
                        Múltiplas variantes e opções de personalização
                      </p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="text-design-base font-semibold mb-2">🔧 Craft.js</h4>
                      <p className="text-design-sm text-muted-foreground">
                        Painel de configuração completo para edição visual
                      </p>
                    </div>
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="text-design-base font-semibold mb-2">⚡ Performance</h4>
                      <p className="text-design-sm text-muted-foreground">
                        Otimizado para carregamento rápido e interações suaves
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <h1 className="text-design-xl font-inter font-bold mb-4">
              Selecione uma seção
            </h1>
            <p className="text-design-base text-muted-foreground">
              Escolha uma seção no menu lateral para ver a documentação.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-design-lg font-inter font-bold">
              Design System
            </h1>
          </div>
          <Badge className="bg-primary text-primary-foreground">
            v1.0.0
          </Badge>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          mt-16 md:mt-0
        `}>
          <div className="p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => toggleSection(item.id)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.title}
                    {expandedSections.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4 ml-auto" />
                    ) : (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </Button>
                  
                  {expandedSections.includes(item.id) && (
                    <div className="ml-6 space-y-1 mt-2">
                      {item.children.map((child) => (
                        <Button
                          key={child.id}
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-left ${
                            activeSection === child.id ? 'bg-primary text-primary-foreground' : ''
                          }`}
                          onClick={() => {
                            setActiveSection(child.id);
                            setSidebarOpen(false);
                          }}
                        >
                          {child.title}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Documentation;