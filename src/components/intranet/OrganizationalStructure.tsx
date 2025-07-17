import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import { ChevronDown, ChevronRight, File, Folder, FolderPlus, ImageIcon, Info, Plus, Share2, Upload, User, Users, X, Search, Grid3X3, List, ChevronLeft, Settings, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
  ownerId: string;
}

interface Folder {
  id: string;
  name: string;
  documents: Document[];
  subFolders?: Folder[];
  isExpanded?: boolean;
  sharingType?: 'general' | 'specific' | 'organization';
  ownerId: string;
  sharedWith?: string[];
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
  { id: '1', name: 'Relatório Mensal.pdf', type: 'PDF', size: '2.5 MB', lastModified: '2023-05-15', sharingType: 'organization', ownerId: '1' },
  { id: '2', name: 'Procedimentos.docx', type: 'DOCX', size: '1.8 MB', lastModified: '2023-06-02', sharingType: 'general', ownerId: '1' },
  { id: '3', name: 'Organograma.png', type: 'PNG', size: '4.2 MB', lastModified: '2023-04-30', sharedWith: ['1', '2'], sharingType: 'specific', ownerId: '2' },
];

const defaultFolders: Folder[] = [
  { 
    id: '1', 
    name: 'Geral', 
    documents: defaultDocuments,
    sharingType: 'general',
    ownerId: '1',
    subFolders: [
      { id: '1-1', name: 'Relatórios', documents: [], sharingType: 'organization', ownerId: '1' },
      { id: '1-2', name: 'Procedimentos', documents: [], sharingType: 'specific', ownerId: '2', sharedWith: ['1', '3'] }
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
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentFolderPath, setCurrentFolderPath] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);

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
    setCurrentFolderPath([]);
    setCurrentFolder(null);
  };

  const navigateToFolder = (folder: Folder, path: string[]) => {
    setCurrentFolder(folder);
    setCurrentFolderPath(path);
  };

  const navigateBack = () => {
    if (currentFolderPath.length > 0) {
      const newPath = currentFolderPath.slice(0, -1);
      if (newPath.length === 0) {
        setCurrentFolder(null);
        setCurrentFolderPath([]);
      } else {
        // Find parent folder
        const findFolderByPath = (folders: Folder[], path: string[]): Folder | null => {
          if (path.length === 0) return null;
          
          for (const folder of folders) {
            if (folder.name === path[0]) {
              if (path.length === 1) return folder;
              if (folder.subFolders) {
                const result = findFolderByPath(folder.subFolders, path.slice(1));
                if (result) return result;
              }
            }
          }
          return null;
        };
        
        const parentFolder = findFolderByPath(folders, newPath);
        setCurrentFolder(parentFolder);
        setCurrentFolderPath(newPath);
      }
    }
  };

  const getPersonById = (id: string) => people.find(p => p.id === id);

  const filteredDocuments = currentFolder?.documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const renderBreadcrumb = () => {
    if (!selectedUnit || currentFolderPath.length === 0) return null;

    return (
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
        <button
          onClick={() => navigateBack()}
          className="hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span>{selectedUnit.title}</span>
        {currentFolderPath.map((folderName, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="h-3 w-3" />
            <button
              onClick={() => {
                const newPath = currentFolderPath.slice(0, index + 1);
                // Navigate to this specific folder
                const findFolderByPath = (folders: Folder[], path: string[]): Folder | null => {
                  if (path.length === 0) return null;
                  
                  for (const folder of folders) {
                    if (folder.name === path[0]) {
                      if (path.length === 1) return folder;
                      if (folder.subFolders) {
                        const result = findFolderByPath(folder.subFolders, path.slice(1));
                        if (result) return result;
                      }
                    }
                  }
                  return null;
                };
                
                const targetFolder = findFolderByPath(folders, newPath);
                if (targetFolder) {
                  setCurrentFolder(targetFolder);
                  setCurrentFolderPath(newPath);
                }
              }}
              className="hover:text-foreground transition-colors"
            >
              {folderName}
            </button>
          </React.Fragment>
        ))}
      </div>
    );
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
              onClick={() => navigateToFolder(folder, [...currentFolderPath, folder.name])}
            >
              <button 
                className="mr-1 text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolderExpand(folder.id);
                }}
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
                
                {/* Owner indicator */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center ml-2">
                        <Crown className="h-3 w-3 text-yellow-500 mr-1" />
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={getPersonById(folder.ownerId)?.avatar} />
                          <AvatarFallback className="text-xs">
                            {getPersonById(folder.ownerId)?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Proprietário: {getPersonById(folder.ownerId)?.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {folder.sharingType && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge 
                          variant={
                            folder.sharingType === 'general' 
                              ? "default" 
                              : folder.sharingType === 'specific' 
                                ? "secondary" 
                                : "outline"
                          } 
                          className={`text-design-xs ml-2 cursor-help ${
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-2">
                          <p className="font-medium">
                            {folder.sharingType === 'general' 
                              ? "Acesso Geral" 
                              : folder.sharingType === 'specific' 
                                ? "Acesso Específico" 
                                : "Acesso Restrito"}
                          </p>
                          {folder.sharingType === 'specific' && folder.sharedWith && (
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Compartilhado com:</p>
                              {folder.sharedWith.map(personId => {
                                const person = getPersonById(personId);
                                return person ? (
                                  <div key={personId} className="flex items-center space-x-2">
                                    <Avatar className="h-4 w-4">
                                      <AvatarImage src={person.avatar} />
                                      <AvatarFallback className="text-xs">
                                        {person.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs">{person.name}</span>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                    <Share2 className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Gerenciar Pasta</DialogTitle>
                    <DialogDescription>
                      Configure permissões e proprietário da pasta "{folder.name}"
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-4 space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Proprietário Atual</Label>
                      <div className="flex items-center space-x-2 mt-2 p-2 bg-muted rounded-lg">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={getPersonById(folder.ownerId)?.avatar} />
                          <AvatarFallback className="text-xs">
                            {getPersonById(folder.ownerId)?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{getPersonById(folder.ownerId)?.name}</span>
                        <Button variant="outline" size="sm" className="ml-auto">
                          <Settings className="h-3 w-3 mr-1" />
                          Transferir
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
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
                  <div className="mt-6">
                    {renderBreadcrumb()}
                    
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-design-base font-inter font-semibold">
                        {currentFolder ? `Pasta: ${currentFolder.name}` : 'Documentos'}
                      </h4>
                      <div className="flex space-x-2">
                        {/* Search */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Buscar documentos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-48"
                          />
                        </div>
                        
                        {/* View Mode Toggle */}
                        <div className="flex border border-border rounded-md">
                          <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className="rounded-r-none"
                          >
                            <List className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className="rounded-l-none border-l"
                          >
                            <Grid3X3 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <FolderPlus className="h-4 w-4 mr-2" />
                              Nova Pasta
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Criar Nova Pasta</DialogTitle>
                              <DialogDescription>
                                Crie uma nova pasta e defina as permissões de acesso
                              </DialogDescription>
                            </DialogHeader>
                            <div className="p-4 space-y-4">
                              <div>
                                <Label htmlFor="folder-name">Nome da Pasta</Label>
                                <Input 
                                  id="folder-name"
                                  type="text" 
                                  placeholder="Digite o nome da pasta..."
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Permissões de Acesso</Label>
                                <RadioGroup defaultValue="organization" className="space-y-3 mt-2">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="general" id="new-general" />
                                    <Label htmlFor="new-general" className="flex items-center cursor-pointer">
                                      <span className="font-medium">Geral</span>
                                      <span className="text-muted-foreground text-design-xs ml-2">
                                        - Acessível a todos na empresa
                                      </span>
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="organization" id="new-organization" />
                                    <Label htmlFor="new-organization" className="flex items-center cursor-pointer">
                                      <span className="font-medium">Restrito à Estrutura</span>
                                      <span className="text-muted-foreground text-design-xs ml-2">
                                        - Apenas pessoas vinculadas a esta estrutura
                                      </span>
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="specific" id="new-specific" />
                                    <Label htmlFor="new-specific" className="flex items-center cursor-pointer">
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
                                  Criar Pasta
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>
                    
                    {currentFolder ? (
                      <div>
                        {/* Current folder documents */}
                        {filteredDocuments.length > 0 && (
                          <div className={`mb-6 ${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-2'}`}>
                            {filteredDocuments.map(doc => (
                              <div 
                                key={doc.id} 
                                className={`${viewMode === 'grid' ? 'p-4 border border-border rounded-lg hover:bg-muted/50' : 'flex items-center p-2 rounded-md hover:bg-muted'}`}
                              >
                                <File className={`h-4 w-4 text-muted-foreground ${viewMode === 'grid' ? 'mb-2' : 'mr-2'}`} />
                                <div className={`${viewMode === 'grid' ? 'space-y-1' : 'flex-1 flex items-center'}`}>
                                  <span className={`text-design-sm ${viewMode === 'grid' ? 'block' : ''}`}>{doc.name}</span>
                                  <div className={`flex items-center space-x-2 ${viewMode === 'grid' ? 'mt-2' : 'ml-auto'}`}>
                                    <Badge variant="outline" className="text-design-xs">{doc.type}</Badge>
                                    
                                    {/* Owner indicator */}
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="flex items-center">
                                            <Crown className="h-3 w-3 text-yellow-500 mr-1" />
                                            <Avatar className="h-4 w-4">
                                              <AvatarImage src={getPersonById(doc.ownerId)?.avatar} />
                                              <AvatarFallback className="text-xs">
                                                {getPersonById(doc.ownerId)?.name.charAt(0)}
                                              </AvatarFallback>
                                            </Avatar>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Proprietário: {getPersonById(doc.ownerId)?.name}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    {doc.sharingType && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Badge 
                                              variant={
                                                doc.sharingType === 'general' 
                                                  ? "default" 
                                                  : doc.sharingType === 'specific' 
                                                    ? "secondary" 
                                                    : "outline"
                                              } 
                                              className={`text-design-xs cursor-help ${
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
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <div className="space-y-2">
                                              <p className="font-medium">
                                                {doc.sharingType === 'general' 
                                                  ? "Acesso Geral" 
                                                  : doc.sharingType === 'specific' 
                                                    ? "Acesso Específico" 
                                                    : "Acesso Restrito"}
                                              </p>
                                              {doc.sharingType === 'specific' && doc.sharedWith && (
                                                <div className="space-y-1">
                                                  <p className="text-xs text-muted-foreground">Compartilhado com:</p>
                                                  {doc.sharedWith.map(personId => {
                                                    const person = getPersonById(personId);
                                                    return person ? (
                                                      <div key={personId} className="flex items-center space-x-2">
                                                        <Avatar className="h-4 w-4">
                                                          <AvatarImage src={person.avatar} />
                                                          <AvatarFallback className="text-xs">
                                                            {person.name.charAt(0)}
                                                          </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-xs">{person.name}</span>
                                                      </div>
                                                    ) : null;
                                                  })}
                                                </div>
                                              )}
                                            </div>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Subfolders */}
                        {currentFolder.subFolders && currentFolder.subFolders.length > 0 && (
                          <div>
                            <Separator className="my-4" />
                            <h5 className="text-design-sm font-medium mb-3">Subpastas</h5>
                            {renderFolderTree(currentFolder.subFolders)}
                          </div>
                        )}
                      </div>
                    ) : (
                      renderFolderTree(folders)
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-design-sm text-muted-foreground">
                  Selecione uma estrutura organizacional para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add settings for Craft.js
export const OrganizationalStructureSettings = () => {
  const { actions: { setProp }, title, description, showDocuments, showPeople } = useNode((node) => ({
    title: node.data.props.title,
    description: node.data.props.description,
    showDocuments: node.data.props.showDocuments,
    showPeople: node.data.props.showPeople,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="text-design-sm font-medium">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setProp((props: any) => props.title = e.target.value)}
          className="w-full mt-1 p-2 border border-border rounded-md text-design-sm"
        />
      </div>
      
      <div>
        <label className="text-design-sm font-medium">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setProp((props: any) => props.description = e.target.value)}
          className="w-full mt-1 p-2 border border-border rounded-md text-design-sm"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showDocuments}
            onChange={(e) => setProp((props: any) => props.showDocuments = e.target.checked)}
          />
          <span className="text-design-sm">Mostrar aba de documentos</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showPeople}
            onChange={(e) => setProp((props: any) => props.showPeople = e.target.checked)}
          />
          <span className="text-design-sm">Mostrar aba de pessoas</span>
        </label>
      </div>
    </div>
  );
};

// Craft.js configuration
(OrganizationalStructure as any).craft = {
  props: {
    title: "Estrutura Organizacional",
    description: "Gerencie a estrutura da sua organização e os documentos associados",
    showDocuments: true,
    showPeople: true,
  },
  related: {
    settings: OrganizationalStructureSettings,
  },
};