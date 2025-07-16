import React, { useState } from 'react';
import { HeroBanner } from '@/components/intranet/HeroBanner';
import { AnnouncementCard } from '@/components/intranet/AnnouncementCard';
import { NewsFeed } from '@/components/intranet/NewsFeed';
import { BirthdayCard } from '@/components/intranet/BirthdayCard';
import { QuickAccessCard } from '@/components/intranet/QuickAccessCard';
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
        { id: 'quick-access', title: 'Acesso Rápido' }
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
                  <h2 className="text-design-lg font-inter font-bold mb-4">Layouts</h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">grid</Badge>
                      <span className="text-design-sm">Grade de itens</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">list</Badge>
                      <span className="text-design-sm">Lista vertical</span>
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