import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroBanner } from '@/components/intranet/HeroBanner';
import { AnnouncementCard } from '@/components/intranet/AnnouncementCard';
import { NewsFeed } from '@/components/intranet/NewsFeed';
import { BirthdayCard } from '@/components/intranet/BirthdayCard';
import { QuickAccessCard } from '@/components/intranet/QuickAccessCard';
import { Book, Code, Eye, Component, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-design-lg font-inter font-bold text-card-foreground">
                Design System Intranet
              </h1>
              <Badge className="bg-primary text-primary-foreground">
                v1.0.0
              </Badge>
            </div>
            <Link to="/docs">
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <Book className="mr-2 h-4 w-4" />
                Documentação
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-design-xl font-inter font-bold mb-4">
              Sistema de Design Completo para Intranet
            </h1>
            <p className="text-design-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Biblioteca abrangente de componentes TypeScript com integração Craft.js, 
              baseada em tokens de design e otimizada para aplicações de intranet corporativa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/docs">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                  <Book className="mr-2 h-4 w-4" />
                  Ver Documentação
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Code className="mr-2 h-4 w-4" />
                Código no GitHub
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-card border border-border rounded-lg shadow-design-sm">
              <Component className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-design-base font-inter font-semibold mb-2">30+ Componentes</h3>
              <p className="text-design-sm text-muted-foreground">
                Componentes especializados para intranet: banners, feeds, cards de aniversário, 
                painéis de aprovação e muito mais.
              </p>
            </div>
            
            <div className="text-center p-6 bg-card border border-border rounded-lg shadow-design-sm">
              <Code className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-design-base font-inter font-semibold mb-2">TypeScript</h3>
              <p className="text-design-sm text-muted-foreground">
                Totalmente tipado com TypeScript para maior segurança e produtividade 
                durante o desenvolvimento.
              </p>
            </div>
            
            <div className="text-center p-6 bg-card border border-border rounded-lg shadow-design-sm">
              <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-design-base font-inter font-semibold mb-2">Craft.js Ready</h3>
              <p className="text-design-sm text-muted-foreground">
                Integração nativa com Craft.js para construção visual de páginas 
                com painel de propriedades completo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-design-lg font-inter font-bold mb-4">
              Veja os Componentes em Ação
            </h2>
            <p className="text-design-base text-muted-foreground">
              Exemplos práticos dos componentes mais utilizados em intranets corporativas
            </p>
          </div>

          <div className="space-y-8">
            {/* Hero Banner Demo */}
            <div>
              <h3 className="text-design-base font-inter font-semibold mb-4">
                Banner Principal
              </h3>
              <HeroBanner />
            </div>

            {/* Grid with components */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-design-base font-inter font-semibold mb-4">
                  Cards de Comunicado
                </h3>
                <div className="space-y-4">
                  <AnnouncementCard />
                  <AnnouncementCard 
                    variant="urgent" 
                    title="Manutenção Programada"
                    content="Sistema estará indisponível das 02:00 às 06:00 para manutenção."
                    urgent={true}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-design-base font-inter font-semibold mb-4">
                  Feed de Notícias
                </h3>
                <NewsFeed />
              </div>
            </div>

            {/* Second row of components */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-design-base font-inter font-semibold mb-4">
                  Cards de Aniversário
                </h3>
                <div className="space-y-4">
                  <BirthdayCard />
                  <BirthdayCard 
                    variant="new-hire" 
                    title="Novos Colaboradores"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-design-base font-inter font-semibold mb-4">
                  Acesso Rápido
                </h3>
                <QuickAccessCard variant="featured" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-design-lg font-inter font-bold mb-4">
            Comece a Usar Hoje
          </h2>
          <p className="text-design-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore a documentação completa e veja como implementar cada componente 
            em sua aplicação de intranet.
          </p>
          <Link to="/docs">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
              Ir para Documentação
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-design-sm text-muted-foreground">
            © 2024 Design System Intranet. Construído com React, TypeScript e Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
