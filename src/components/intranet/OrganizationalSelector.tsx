import React, { useState } from 'react';
import { useNode, Element } from '@craftjs/core';
import { useNavigate } from 'react-router-dom';
import { Building2, ChevronDown, ChevronRight, Users, FileText, Settings, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Interfaces
interface Department {
  id: string;
  name: string;
  description: string;
  color: string;
  members: number;
  manager: string;
  managerAvatar: string;
}

interface OrganizationalSelectorProps {
  selectedDepartmentId?: string;
  showStats?: boolean;
  showManager?: boolean;
  showAccessButton?: boolean;
  layout?: 'card' | 'compact' | 'banner';
}

// Sample departments data
const departments: Department[] = [
  {
    id: '1',
    name: 'Vendas',
    description: 'Responsável pela geração de receita e relacionamento com clientes',
    color: 'blue',
    members: 12,
    manager: 'Maria Silva',
    managerAvatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Marketing',
    description: 'Responsável pela comunicação e promoção da marca',
    color: 'purple',
    members: 8,
    manager: 'João Santos',
    managerAvatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Recursos Humanos',
    description: 'Gestão de pessoas e desenvolvimento organizacional',
    color: 'green',
    members: 6,
    manager: 'Ana Oliveira',
    managerAvatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    name: 'TI',
    description: 'Tecnologia da informação e infraestrutura',
    color: 'cyan',
    members: 15,
    manager: 'Carlos Lima',
    managerAvatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: '5',
    name: 'Financeiro',
    description: 'Controle financeiro e contabilidade',
    color: 'yellow',
    members: 9,
    manager: 'Fernanda Costa',
    managerAvatar: 'https://i.pravatar.cc/150?img=5'
  }
];

export const OrganizationalSelector: React.FC<OrganizationalSelectorProps> = ({
  selectedDepartmentId = '1',
  showStats = true,
  showManager = true,
  showAccessButton = true,
  layout = 'card'
}) => {
  const navigate = useNavigate();
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp }
  } = useNode((state) => ({
    selected: state.events.selected
  }));

  const selectedDepartment = departments.find(dept => dept.id === selectedDepartmentId) || departments[0];

  const handleAccessDepartment = () => {
    // Simula navegação para página específica do departamento
    // Em uma implementação real, seria algo como: /intranet/department/${selectedDepartment.id}
    navigate('/intranet', { state: { selectedDepartment: selectedDepartment.id } });
  };

  const renderCard = () => (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <div className={`w-3 h-3 rounded-full bg-${selectedDepartment.color}-500 mr-2`} />
            {selectedDepartment.name}
          </CardTitle>
          <Building2 className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{selectedDepartment.description}</p>
        
        {showStats && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm">{selectedDepartment.members} membros</span>
              </div>
            </div>
          </div>
        )}

        {showManager && (
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Avatar className="h-6 w-6">
              <AvatarImage src={selectedDepartment.managerAvatar} />
              <AvatarFallback>{selectedDepartment.manager.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">Gerente: {selectedDepartment.manager}</span>
          </div>
        )}

        {showAccessButton && (
          <Button 
            onClick={handleAccessDepartment}
            className="w-full mt-3"
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Acessar Página do Departamento
          </Button>
        )}
      </CardContent>
    </Card>
  );

  const renderCompact = () => (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
      <div className="flex items-center space-x-3">
        <div className={`w-4 h-4 rounded-full bg-${selectedDepartment.color}-500`} />
        <div>
          <h3 className="font-medium">{selectedDepartment.name}</h3>
          {showStats && (
            <p className="text-sm text-muted-foreground">{selectedDepartment.members} membros</p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {showManager && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={selectedDepartment.managerAvatar} />
            <AvatarFallback>{selectedDepartment.manager.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        {showAccessButton && (
          <Button onClick={handleAccessDepartment} size="sm" variant="outline">
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  const renderBanner = () => (
    <div className={`relative p-6 rounded-lg bg-gradient-to-r from-${selectedDepartment.color}-600 to-${selectedDepartment.color}-700 text-white`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-bold">{selectedDepartment.name}</h2>
          <p className="text-sm opacity-90 mt-1">{selectedDepartment.description}</p>
          {showStats && (
            <div className="flex items-center mt-3 space-x-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">{selectedDepartment.members} membros</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center space-y-3">
          {showManager && (
            <div className="text-center">
              <Avatar className="h-12 w-12 mx-auto mb-2">
                <AvatarImage src={selectedDepartment.managerAvatar} />
                <AvatarFallback>{selectedDepartment.manager.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-sm">Gerente</p>
              <p className="text-xs opacity-90">{selectedDepartment.manager}</p>
            </div>
          )}
          {showAccessButton && (
            <Button 
              onClick={handleAccessDepartment}
              variant="secondary"
              size="sm"
              className="text-black"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Acessar
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderLayout = () => {
    switch (layout) {
      case 'compact':
        return renderCompact();
      case 'banner':
        return renderBanner();
      default:
        return renderCard();
    }
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`${selected ? 'outline-2 outline-blue-500 outline' : ''}`}
    >
      {renderLayout()}
    </div>
  );
};

export const OrganizationalSelectorSettings: React.FC = () => {
  const {
    actions: { setProp },
    selectedDepartmentId,
    showStats,
    showManager,
    showAccessButton,
    layout
  } = useNode((node) => ({
    selectedDepartmentId: node.data.props.selectedDepartmentId,
    showStats: node.data.props.showStats,
    showManager: node.data.props.showManager,
    showAccessButton: node.data.props.showAccessButton,
    layout: node.data.props.layout
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Departamento</label>
        <Select
          value={selectedDepartmentId}
          onValueChange={(value) => setProp((props: OrganizationalSelectorProps) => props.selectedDepartmentId = value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-${dept.color}-500 mr-2`} />
                  {dept.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Layout</label>
        <Select
          value={layout}
          onValueChange={(value) => setProp((props: OrganizationalSelectorProps) => props.layout = value as 'card' | 'compact' | 'banner')}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="card">Card Completo</SelectItem>
            <SelectItem value="compact">Compacto</SelectItem>
            <SelectItem value="banner">Banner</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Mostrar Estatísticas</label>
          <input
            type="checkbox"
            checked={showStats}
            onChange={(e) => setProp((props: OrganizationalSelectorProps) => props.showStats = e.target.checked)}
            className="rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Mostrar Gerente</label>
          <input
            type="checkbox"
            checked={showManager}
            onChange={(e) => setProp((props: OrganizationalSelectorProps) => props.showManager = e.target.checked)}
            className="rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Mostrar Botão de Acesso</label>
          <input
            type="checkbox"
            checked={showAccessButton}
            onChange={(e) => setProp((props: OrganizationalSelectorProps) => props.showAccessButton = e.target.checked)}
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
};

(OrganizationalSelector as any).craft = {
  props: {
    selectedDepartmentId: '1',
    showStats: true,
    showManager: true,
    showAccessButton: true,
    layout: 'card'
  },
  related: {
    settings: OrganizationalSelectorSettings
  }
};