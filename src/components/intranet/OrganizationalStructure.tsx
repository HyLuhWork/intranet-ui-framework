import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import { ChevronDown, ChevronRight, File, Folder, FolderPlus, ImageIcon, Info, Plus, Share2, Upload, User, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import orgStructureCover from '@/assets/org-structure-cover.jpg';

declare module '@craftjs/core' {
  interface ComponentEvents {
    selected: boolean;
  }
}

// Data interfaces
interface OrganizationalUnit {
  id: string;
  title: string;
  description?: string;
  isActive?: boolean;
  parent?: string | null;
  coverImage?: string;
  children?: OrganizationalUnit[];
  isExpanded?: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  sharedWith?: string[];
  sharingType?: 'general' | 'specific' | 'organization';
}

interface Folder {
  id: string;
  name: string;
  documents: Document[];
  subFolders?: Folder[];
  isExpanded?: boolean;
  sharingType?: 'general' | 'specific' | 'organization';
}

interface Person {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface OrganizationalStructureProps {
  title?: string;
  description?: string;
  structureData?: OrganizationalUnit[];
  showDocuments?: boolean;
  showPeople?: boolean;
}

// Default data
const defaultPeople: Person[] = [
  { id: '1', name: 'Maria Silva', role: 'Gerente', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'João Santos', role: 'Analista', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Ana Oliveira', role: 'Desenvolvedor', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const defaultDocuments: Document[] = [
  { id: '1', name: 'Relatório Mensal.pdf', type: 'PDF', size: '2.5 MB', lastModified: '2023-05-15', sharingType: 'organization' },
  { id: '2', name: 'Procedimentos.docx', type: 'DOCX', size: '1.8 MB', lastModified: '2023-06-02', sharingType: 'general' },
  { id: '3', name: 'Organograma.png', type: 'PNG', size: '4.2 MB', lastModified: '2023-04-30', sharedWith: ['1', '2'], sharingType: 'specific' },
];

const defaultFolders: Folder[] = [
  { 
    id: '1', 
    name: 'Geral', 
    documents: defaultDocuments,
    sharingType: 'general',
    subFolders: [
      { id: '1-1', name: 'Relatórios', documents: [], sharingType: 'organization' },
      { id: '1-2', name: 'Procedimentos', documents: [], sharingType: 'specific' }
    ],
    isExpanded: true
  }
];

const defaultStructureData: OrganizationalUnit[] = [
  {
    id: '1',
    title: 'Corporativo',
    description: 'Estrutura principal da empresa',
    isActive: true,
    parent: null,
    children: [
      {
        id: '1-1',
        title: 'Negócios',
        description: 'Área de negócios da empresa',
        isActive: true,
        parent: '1',
        children: [
          {
            id: '1-1-1',
            title: 'Vendas',
            description: 'Equipe de vendas',
            isActive: true,
            parent: '1-1'
          },
          {
            id: '1-1-2',
            title: 'Marketing',
            description: 'Equipe de marketing',
            isActive: true,
            parent: '1-1'
          }
        ]
      },
      {
        id: '1-2',
        title: 'Tecnologia',
        description: 'Área de tecnologia da empresa',
        isActive: true,
        parent: '1',
        children: [
          {
            id: '1-2-1',
            title: 'Desenvolvimento',
            description: 'Equipe de desenvolvimento',
            isActive: true,
            parent: '1-2'
          },
          {
            id: '1-2-2',
            title: 'Infraestrutura',
            description: 'Equipe de infraestrutura',
            isActive: true,
            parent: '1-2'
          }
        ]
      }
    ]
  }
];

export const OrganizationalStructure: React.FC<OrganizationalStructureProps> = ({
  title = "Estrutura Organizacional",
  description = "Gerencie a estrutura da sua organização e os documentos associados",
  structureData = defaultStructureData,
  showDocuments = true,
  showPeople = true
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

  const [structure, setStructure] = useState(structureData);
  const [selectedUnit, setSelectedUnit] = useState<OrganizationalUnit | null>(null);
  const [folders, setFolders] = useState(defaultFolders);
  const [people] = useState(defaultPeople);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleExpand = (unitId: string) => {
    const updateExpanded = (units: OrganizationalUnit[]): OrganizationalUnit[] => {
      return units.map(unit => {
        if (unit.id === unitId) {
          return { ...unit, isExpanded: !unit.isExpanded };
        }
        if (unit.children) {
          return { ...unit, children: updateExpanded(unit.children) };
        }
        return unit;
      });
    };
    
    setStructure(updateExpanded(structure));
  };

  const toggleFolderExpand = (folderId: string) => {
    const updateFolderExpanded = (folders: Folder[]): Folder[] => {
      return folders.map(folder => {
        if (folder.id === folderId) {
          return { ...folder, isExpanded: !folder.isExpanded };
        }
        if (folder.subFolders) {
          return { ...folder, subFolders: updateFolderExpanded(folder.subFolders) };
        }
        return folder;
      });
    };
    
    setFolders(updateFolderExpanded(folders));
  };

  const handleUnitClick = (unit: OrganizationalUnit) => {
    setSelectedUnit(unit);
    setActiveTab('overview');
  };

  const renderStructureTree = (units: OrganizationalUnit[], level = 0) => {
    return (
      <ul className={`pl-${level > 0 ? 4 : 0}`}>
        {units.map(unit => (
          <li key={unit.id} className="mb-1">
            <div 
              className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-muted ${selectedUnit?.id === unit.id ? 'bg-muted' : ''}`}
            >
              <button 
                className="mr-1 text-muted-foreground hover:text-foreground"
                onClick={() => toggleExpand(unit.id)}
              >
                {unit.children && unit.children.length > 0 ? (
                  unit.isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )
                ) : (
                  <div className="w-4" />
                )}
              </button>
              
              <div 
                className="flex-1 flex items-center"
                onClick={() => handleUnitClick(unit)}
              >
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span className="text-design-sm">{unit.title}</span>
              </div>
              
              <Badge 
                variant={unit.isActive ? "secondary" : "outline"} 
                className={`text-design-xs ml-2 ${unit.isActive ? "bg-success text-success-foreground" : ""}`}
              >
                {unit.isActive ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            
            {unit.children && unit.children.length > 0 && unit.isExpanded && (
              renderStructureTree(unit.children, level + 1)
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderFolderTree = (folders: Folder[], level = 0) => {
    return (
      <ul className={`pl-${level > 0 ? 4 : 0}`}>
        {folders.map(folder => (
          <li key={folder.id} className="mb-1">
            <div 
              className="flex items-center p-2 rounded-md cursor-pointer hover:bg-muted"
            >
              <button 
                className="mr-1 text-muted-foreground hover:text-foreground"
                onClick={() => toggleFolderExpand(folder.id)}
              >
                {folder.subFolders && folder.subFolders.length > 0 ? (
                  folder.isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )
                ) : (
                  <div className="w-4" />
                )}
              </button>
              
              <div className="flex-1 flex items-center">
                <Folder className="h-4 w-4 mr-2 text-primary" />
                <span className="text-design-sm">{folder.name}</span>
                {folder.sharingType && (
                  <Badge 
                    variant={
                      folder.sharingType === 'general' 
                        ? "default" 
                        : folder.sharingType === 'specific' 
                          ? "secondary" 
                          : "outline"
                    } 
                    className={`text-design-xs ml-2 ${
                      folder.sharingType === 'general' 
                        ? "bg-success text-success-foreground" 
                        : folder.sharingType === 'specific'
                          ? "bg-warning text-warning-foreground"
                          : ""
                    }`}
                  >
                    {folder.sharingType === 'general' 
                      ? "Geral" 
                      : folder.sharingType === 'specific' 
                        ? "Compartilhado" 
                        : "Restrito"}
                  </Badge>
                )}
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Share2 className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Compartilhar Pasta</DialogTitle>
                    <DialogDescription>
                      Defina as permissões de acesso para a pasta "{folder.name}"
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-4 space-y-4">
                    <RadioGroup defaultValue={folder.sharingType || 'organization'} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general" className="flex items-center cursor-pointer">
                          <span className="font-medium">Geral</span>
                          <span className="text-muted-foreground text-design-xs ml-2">
                            - Acessível a todos na empresa
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organization" id="organization" />
                        <Label htmlFor="organization" className="flex items-center cursor-pointer">
                          <span className="font-medium">Restrito à Estrutura</span>
                          <span className="text-muted-foreground text-design-xs ml-2">
                            - Apenas pessoas vinculadas a esta estrutura
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="specific" id="specific" />
                        <Label htmlFor="specific" className="flex items-center cursor-pointer">
                          <span className="font-medium">Pessoas Específicas</span>
                          <span className="text-muted-foreground text-design-xs ml-2">
                            - Selecionar indivíduos específicos
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Salvar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {folder.documents.length > 0 && folder.isExpanded && (
              <ul className="pl-6 mt-1">
                {folder.documents.map(doc => (
                  <li key={doc.id} className="mb-1">
                    <div className="flex items-center p-2 rounded-md hover:bg-muted">
                      <File className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-design-sm">{doc.name}</span>
                      <Badge variant="outline" className="text-design-xs ml-2">{doc.type}</Badge>
                      {doc.sharingType && (
                        <Badge 
                          variant={
                            doc.sharingType === 'general' 
                              ? "default" 
                              : doc.sharingType === 'specific' 
                                ? "secondary" 
                                : "outline"
                          } 
                          className={`text-design-xs ml-2 ${
                            doc.sharingType === 'general' 
                              ? "bg-success text-success-foreground" 
                              : doc.sharingType === 'specific'
                                ? "bg-warning text-warning-foreground"
                                : ""
                          }`}
                        >
                          {doc.sharingType === 'general' 
                            ? "Geral" 
                            : doc.sharingType === 'specific' 
                              ? "Compartilhado" 
                              : "Restrito"}
                        </Badge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            
            {folder.subFolders && folder.subFolders.length > 0 && folder.isExpanded && (
              renderFolderTree(folder.subFolders, level + 1)
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`bg-card rounded-lg border border-border shadow-design-sm ${selected ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-design-lg font-inter font-bold text-card-foreground">
            {title}
          </h2>
          <Button size="sm" className="bg-primary hover:bg-primary-hover text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Nova Estrutura
          </Button>
        </div>
        
        <p className="text-design-sm text-muted-foreground mb-6">{description}</p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left panel - Structure tree */}
          <div className="w-full lg:w-1/3 bg-muted/30 rounded-lg p-4 border border-border">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-design-base font-inter font-semibold">Hierarquia</h3>
              <Button variant="outline" size="sm">
                <Plus className="h-3 w-3 mr-1" />
                Adicionar
              </Button>
            </div>
            {renderStructureTree(structure)}
          </div>
          
          {/* Right panel - Details */}
          <div className="w-full lg:w-2/3">
            {selectedUnit ? (
              <div>
                <div className="mb-6 rounded-lg border border-border overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img 
                      src={selectedUnit.coverImage || orgStructureCover} 
                      alt={`${selectedUnit.title} cover`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-design-lg font-inter font-semibold mb-2 text-white">{selectedUnit.title}</h3>
                      {selectedUnit.description && (
                        <p className="text-design-sm text-white/80 mb-4">{selectedUnit.description}</p>
                      )}
                      <div className="flex space-x-2">
                        <Badge 
                          variant={selectedUnit.isActive ? "secondary" : "outline"}
                          className={selectedUnit.isActive ? "bg-success text-success-foreground" : "border-white text-white"}
                        >
                          {selectedUnit.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                        <Badge variant="secondary">ID: {selectedUnit.id}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4 border-b border-border">
                  <div className="flex space-x-4">
                    <button 
                      className={`pb-2 text-design-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Visão Geral
                    </button>
                    {showPeople && (
                      <button 
                        className={`pb-2 text-design-sm font-medium ${activeTab === 'people' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                        onClick={() => setActiveTab('people')}
                      >
                        Pessoas
                      </button>
                    )}
                    {showDocuments && (
                      <button 
                        className={`pb-2 text-design-sm font-medium ${activeTab === 'documents' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                        onClick={() => setActiveTab('documents')}
                      >
                        Documentos
                      </button>
                    )}
                  </div>
                </div>
                
                {activeTab === 'overview' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-muted/30 rounded-lg border border-border">
                        <h4 className="text-design-base font-inter font-semibold mb-2">Informações</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-design-sm text-muted-foreground">ID:</span>
                            <span className="text-design-sm font-medium">{selectedUnit.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-design-sm text-muted-foreground">Status:</span>
                            <span className="text-design-sm font-medium">{selectedUnit.isActive ? "Ativo" : "Inativo"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-design-sm text-muted-foreground">Hierarquia:</span>
                            <span className="text-design-sm font-medium">{selectedUnit.parent || "Raiz"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg border border-border">
                        <h4 className="text-design-base font-inter font-semibold mb-2">Estatísticas</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-design-sm text-muted-foreground">Pessoas:</span>
                            <span className="text-design-sm font-medium">{people.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-design-sm text-muted-foreground">Documentos:</span>
                            <span className="text-design-sm font-medium">{folders.reduce((acc, folder) => acc + folder.documents.length, 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-design-sm text-muted-foreground">Sub-estruturas:</span>
                            <span className="text-design-sm font-medium">{selectedUnit.children?.length || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'people' && showPeople && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-design-base font-inter font-semibold">Pessoas Vinculadas</h4>
                      <Button variant="outline" size="sm">
                        <User className="h-3 w-3 mr-1" />
                        Adicionar Pessoa
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {people.length === 0 ? (
                        <p className="text-design-sm text-muted-foreground text-center py-8">
                          Nenhuma pessoa vinculada a esta estrutura
                        </p>
                      ) : (
                        people.map(person => (
                          <div key={person.id} className="flex items-center p-3 bg-card rounded-lg border border-border">
                            {person.avatar ? (
                              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                <img src={person.avatar} alt={person.name} className="h-full w-full object-cover" />
                              </div>
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                                <User className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                            
                            <div className="flex-1">
                              <h5 className="text-design-sm font-medium">{person.name}</h5>
                              <p className="text-design-xs text-muted-foreground">{person.role}</p>
                            </div>
                            
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === 'documents' && showDocuments && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-design-base font-inter font-semibold">Documentos</h4>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <FolderPlus className="h-3 w-3 mr-1" />
                              Nova Pasta
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Criar Nova Pasta</DialogTitle>
                              <DialogDescription>
                                Adicione uma nova pasta e defina suas permissões de acesso
                              </DialogDescription>
                            </DialogHeader>
                            <div className="p-4 space-y-4">
                              <div>
                                <label className="text-design-xs-medium block mb-1">NOME DA PASTA</label>
                                <input
                                  type="text"
                                  className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
                                  placeholder="Digite o nome da pasta"
                                />
                              </div>
                              
                              <div>
                                <label className="text-design-xs-medium block mb-2">TIPO DE COMPARTILHAMENTO</label>
                                <RadioGroup defaultValue="organization" className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="general" id="create-general" />
                                    <Label htmlFor="create-general" className="flex items-center cursor-pointer">
                                      <span className="font-medium">Geral</span>
                                      <span className="text-muted-foreground text-design-xs ml-2">
                                        - Acessível a todos na empresa
                                      </span>
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="organization" id="create-organization" />
                                    <Label htmlFor="create-organization" className="flex items-center cursor-pointer">
                                      <span className="font-medium">Restrito à Estrutura</span>
                                      <span className="text-muted-foreground text-design-xs ml-2">
                                        - Apenas pessoas vinculadas a esta estrutura
                                      </span>
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="specific" id="create-specific" />
                                    <Label htmlFor="create-specific" className="flex items-center cursor-pointer">
                                      <span className="font-medium">Pessoas Específicas</span>
                                      <span className="text-muted-foreground text-design-xs ml-2">
                                        - Selecionar indivíduos específicos
                                      </span>
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                            <DialogFooter className="sm:justify-start">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Cancelar
                                </Button>
                              </DialogClose>
                              <Button type="button">
                                Criar Pasta
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg border border-border p-4">
                      {folders.length === 0 ? (
                        <p className="text-design-sm text-muted-foreground text-center py-8">
                          Nenhuma pasta ou documento encontrado
                        </p>
                      ) : (
                        renderFolderTree(folders)
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px] bg-muted/20 rounded-lg border border-border">
                <div className="text-center p-6">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-design-base font-inter font-semibold mb-2">Selecione uma Estrutura</h3>
                  <p className="text-design-sm text-muted-foreground mb-4">
                    Clique em uma estrutura organizacional no painel à esquerda para visualizar seus detalhes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Craft.js Settings Panel
export const OrganizationalStructureSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Users className="h-4 w-4" />
        <span className="text-design-sm font-medium">Configurações de Estrutura Organizacional</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-design-xs-medium block mb-1">TÍTULO</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.title || ''}
            onChange={(e) => setProp((props: OrganizationalStructureProps) => props.title = e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-design-xs-medium block mb-1">DESCRIÇÃO</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md text-design-sm"
            value={props.description || ''}
            onChange={(e) => setProp((props: OrganizationalStructureProps) => props.description = e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showDocuments"
              checked={props.showDocuments !== false}
              onChange={(e) => setProp((props: OrganizationalStructureProps) => props.showDocuments = e.target.checked)}
            />
            <label htmlFor="showDocuments" className="text-design-sm">Mostrar gestão de documentos</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPeople"
              checked={props.showPeople !== false}
              onChange={(e) => setProp((props: OrganizationalStructureProps) => props.showPeople = e.target.checked)}
            />
            <label htmlFor="showPeople" className="text-design-sm">Mostrar pessoas vinculadas</label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Craft.js configuration
(OrganizationalStructure as any).craft = {
  props: {
    title: "Estrutura Organizacional",
    description: "Gerencie a estrutura da sua organização e os documentos associados",
    structureData: defaultStructureData,
    showDocuments: true,
    showPeople: true
  },
  related: {
    settings: OrganizationalStructureSettings
  }
};