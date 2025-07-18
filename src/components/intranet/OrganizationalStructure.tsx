import React, { useState } from 'react';
import { 
  Users, FileText, Settings, Search, Plus, Bell, Calendar, 
  MapPin, Phone, Mail, Target, Eye, TrendingUp, Award, 
  Clock, Download, Share2, Edit, UserPlus, MessageSquare,
  Home, Building2, Briefcase, BookOpen, HeadphonesIcon,
  ChevronDown, ChevronRight, Crown, Filter, Grid3X3, List,
  Upload, Folder, File, Star, MoreVertical, User, ChevronLeft,
  FolderPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useNode } from '@craftjs/core';
import orgStructureCover from '@/assets/org-structure-cover.jpg';

// Interfaces
interface Person {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  isManager?: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  ownerId: string;
  isStarred?: boolean;
  sharingType: 'general' | 'specific' | 'organization';
  sharedWith?: string[];
}

interface Folder {
  id: string;
  name: string;
  documents: Document[];
  subFolders?: Folder[];
  ownerId: string;
  sharingType: 'general' | 'specific' | 'organization';
  sharedWith?: string[];
  isExpanded?: boolean;
}

interface OrganizationalUnit {
  id: string;
  title: string;
  description: string;
  parent?: string;
  children?: OrganizationalUnit[];
  isActive: boolean;
  isExpanded?: boolean;
  members?: Person[];
  coverImage?: string;
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
  {
    id: '1',
    name: 'Maria Silva',
    role: 'Gerente de Vendas',
    email: 'maria.silva@empresa.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isManager: true
  },
  {
    id: '2',
    name: 'João Santos',
    role: 'Representante de Vendas',
    email: 'joao.santos@empresa.com',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Ana Oliveira',
    role: 'Analista de Vendas',
    email: 'ana.oliveira@empresa.com',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    name: 'Carlos Lima',
    role: 'Coordenador de TI',
    email: 'carlos.lima@empresa.com',
    avatar: 'https://i.pravatar.cc/150?img=4'
  }
];

const defaultDocuments: Document[] = [
  {
    id: '1',
    name: 'Relatório de Vendas Q4 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-01-15',
    ownerId: '1',
    isStarred: true,
    sharingType: 'organization'
  },
  {
    id: '2',
    name: 'Estratégia de Vendas 2024.pptx',
    type: 'PPTX',
    size: '5.1 MB',
    lastModified: '2024-01-10',
    ownerId: '1',
    sharingType: 'specific',
    sharedWith: ['1', '2']
  },
  {
    id: '3',
    name: 'Lista de Clientes Ativos.xlsx',
    type: 'XLSX',
    size: '1.8 MB',
    lastModified: '2024-01-12',
    ownerId: '2',
    isStarred: true,
    sharingType: 'organization'
  }
];

const defaultFolders: Folder[] = [
  {
    id: '1',
    name: 'Relatórios',
    documents: defaultDocuments.slice(0, 2),
    ownerId: '1',
    sharingType: 'organization',
    isExpanded: true
  },
  {
    id: '2',
    name: 'Treinamentos',
    documents: defaultDocuments.slice(2, 3),
    ownerId: '1',
    sharingType: 'general',
    isExpanded: false
  }
];

const defaultStructureData: OrganizationalUnit[] = [
  {
    id: '1',
    title: 'Diretoria',
    description: 'Alta administração da empresa',
    isActive: true,
    isExpanded: true,
    members: [defaultPeople[0]],
    children: [
      {
        id: '2',
        title: 'Vendas',
        description: 'Departamento responsável pelas vendas e relacionamento com clientes',
        parent: '1',
        isActive: true,
        isExpanded: false,
        members: defaultPeople.slice(0, 3),
        children: [
          {
            id: '3',
            title: 'Vendas Nacionais',
            description: 'Equipe de vendas para mercado nacional',
            parent: '2',
            isActive: true,
            members: defaultPeople.slice(1, 3)
          },
          {
            id: '4',
            title: 'Vendas Internacionais',
            description: 'Equipe de vendas para mercado internacional',
            parent: '2',
            isActive: true,
            members: [defaultPeople[0]]
          }
        ]
      },
      {
        id: '5',
        title: 'Tecnologia',
        description: 'Departamento de TI e desenvolvimento',
        parent: '1',
        isActive: true,
        isExpanded: false,
        members: [defaultPeople[3]]
      }
    ]
  }
];

export const OrganizationalStructure: React.FC<OrganizationalStructureProps> = ({
  title = "Estrutura Organizacional",
  description = "Visualize e gerencie a estrutura organizacional da empresa",
  structureData = defaultStructureData,
  showDocuments = true,
  showPeople = true
}) => {
  const { connectors: { connect, drag } } = useNode();
  
  const [structure, setStructure] = useState<OrganizationalUnit[]>(structureData);
  const [selectedUnit, setSelectedUnit] = useState<OrganizationalUnit | null>(null);
  const [people] = useState<Person[]>(defaultPeople);
  const [documents] = useState<Document[]>(defaultDocuments);
  const [folders, setFolders] = useState<Folder[]>(defaultFolders);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [currentFolderPath, setCurrentFolderPath] = useState<string[]>([]);

  const toggleExpand = (unitId: string) => {
    const toggleUnit = (units: OrganizationalUnit[]): OrganizationalUnit[] => {
      return units.map(unit => ({
        ...unit,
        isExpanded: unit.id === unitId ? !unit.isExpanded : unit.isExpanded,
        children: unit.children ? toggleUnit(unit.children) : undefined
      }));
    };
    setStructure(toggleUnit(structure));
  };

  const toggleFolderExpand = (folderId: string) => {
    const toggleFolder = (folders: Folder[]): Folder[] => {
      return folders.map(folder => ({
        ...folder,
        isExpanded: folder.id === folderId ? !folder.isExpanded : folder.isExpanded,
        subFolders: folder.subFolders ? toggleFolder(folder.subFolders) : undefined
      }));
    };
    setFolders(toggleFolder(folders));
  };

  const handleUnitClick = (unit: OrganizationalUnit) => {
    setSelectedUnit(unit);
    setActiveTab('overview');
    setCurrentFolder(null);
    setCurrentFolderPath([]);
  };

  const navigateToFolder = (folder: Folder, path: string[]) => {
    setCurrentFolder(folder);
    setCurrentFolderPath(path);
  };

  const navigateBack = () => {
    if (currentFolderPath.length > 0) {
      const newPath = currentFolderPath.slice(0, -1);
      setCurrentFolderPath(newPath);
      
      if (newPath.length === 0) {
        setCurrentFolder(null);
      } else {
        const findFolderByPath = (folders: Folder[], path: string[]): Folder | null => {
          for (const folder of folders) {
            if (folder.name === path[0]) {
              if (path.length === 1) {
                return folder;
              } else if (folder.subFolders) {
                return findFolderByPath(folder.subFolders, path.slice(1));
              }
            }
          }
          return null;
        };
        
        const targetFolder = findFolderByPath(folders, newPath);
        if (targetFolder) {
          setCurrentFolder(targetFolder);
        }
      }
    }
  };

  const getPersonById = (id: string): Person | undefined => {
    return people.find(person => person.id === id);
  };

  const filteredDocuments = currentFolder 
    ? currentFolder.documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const renderBreadcrumb = () => {
    if (currentFolderPath.length === 0) return null;
    
    return (
      <div className="flex items-center space-x-2 mb-4 text-sm text-muted-foreground">
        <button 
          onClick={() => {
            setCurrentFolder(null);
            setCurrentFolderPath([]);
          }}
          className="hover:text-foreground transition-colors"
        >
          Documentos
        </button>
        {currentFolderPath.map((folderName, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="h-4 w-4" />
            <button 
              onClick={() => {
                const newPath = currentFolderPath.slice(0, index + 1);
                const findFolderByPath = (folders: Folder[], path: string[]): Folder | null => {
                  for (const folder of folders) {
                    if (folder.name === path[0]) {
                      if (path.length === 1) {
                        return folder;
                      } else if (folder.subFolders) {
                        return findFolderByPath(folder.subFolders, path.slice(1));
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
              className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-muted transition-colors ${selectedUnit?.id === unit.id ? 'bg-muted' : ''}`}
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
                <Building2 className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm font-medium">{unit.title}</span>
              </div>
              
              <Badge 
                variant={unit.isActive ? "default" : "outline"} 
                className={`text-xs ml-2 ${unit.isActive ? "bg-green-100 text-green-800" : ""}`}
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
                <span className="text-sm">{folder.name}</span>
                
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

                {/* Sharing badge */}
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
                        className={`text-xs ml-2 cursor-help ${
                          folder.sharingType === 'general' 
                            ? "bg-green-100 text-green-800" 
                            : folder.sharingType === 'specific'
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {folder.sharingType === 'general' 
                          ? "Geral" 
                          : folder.sharingType === 'specific' 
                            ? "Específico" 
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
              </div>
            </div>
            
            {folder.subFolders && folder.subFolders.length > 0 && folder.isExpanded && (
              renderFolderTree(folder.subFolders, level + 1)
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Left Panel - Tree Structure */}
        <div className="w-80 bg-card border-r flex flex-col">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground text-sm">{description}</p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Nova Estrutura
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Criar Nova Estrutura</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para criar uma nova unidade organizacional.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Cover Image Upload */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Imagem de Capa</Label>
                    <div className="relative h-32 bg-muted rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Clique para adicionar uma imagem</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="structure-name">Nome da Estrutura *</Label>
                      <Input id="structure-name" placeholder="Ex: Departamento de Vendas" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="structure-parent">Estrutura Pai</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione (opcional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhum (estrutura raiz)</SelectItem>
                          {structure.map(unit => (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="structure-description">Descrição</Label>
                    <Textarea 
                      id="structure-description" 
                      placeholder="Descreva o propósito e responsabilidades desta estrutura..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="structure-mission">Missão</Label>
                    <Textarea 
                      id="structure-mission" 
                      placeholder="Qual é a missão desta estrutura organizacional?"
                      className="min-h-[60px]"
                    />
                  </div>

                  {/* Manager Selection */}
                  <div className="space-y-2">
                    <Label>Gestor Responsável</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o gestor" />
                      </SelectTrigger>
                      <SelectContent>
                        {people.map(person => (
                          <SelectItem key={person.id} value={person.id}>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={person.avatar} />
                                <AvatarFallback className="text-xs">
                                  {person.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{person.name}</p>
                                <p className="text-xs text-muted-foreground">{person.role}</p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Team Members */}
                  <div className="space-y-2">
                    <Label>Membros da Equipe</Label>
                    <div className="max-h-32 overflow-y-auto border rounded-md p-3 space-y-2">
                      {people.map(person => (
                        <div key={person.id} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id={`member-${person.id}`}
                            className="rounded border-border"
                          />
                          <Label 
                            htmlFor={`member-${person.id}`} 
                            className="flex items-center space-x-2 cursor-pointer flex-1"
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback className="text-xs">
                                {person.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{person.name}</p>
                              <p className="text-xs text-muted-foreground">{person.role}</p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Informações de Contato</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="contact-email" className="text-xs">Email</Label>
                        <Input 
                          id="contact-email" 
                          type="email" 
                          placeholder="departamento@empresa.com" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone" className="text-xs">Telefone</Label>
                        <Input 
                          id="contact-phone" 
                          placeholder="+55 11 3456-7890" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-location" className="text-xs">Localização</Label>
                        <Input 
                          id="contact-location" 
                          placeholder="Edifício Principal - 3º Andar" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="structure-active"
                      className="rounded border-border"
                      defaultChecked
                    />
                    <Label htmlFor="structure-active" className="text-sm">
                      Estrutura ativa
                    </Label>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button type="button">
                    Criar Estrutura
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Estrutura Organizacional</h3>
              {renderStructureTree(structure)}
            </div>
          </div>
        </div>

        {/* Right Panel - Details */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedUnit ? (
            <>
              {/* Department Banner */}
              <div className="relative h-48 bg-gradient-to-r from-primary to-primary/70 overflow-hidden">
                <img 
                  src={selectedUnit.coverImage || orgStructureCover} 
                  alt="Capa da estrutura"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{selectedUnit.title}</h2>
                  <p className="text-lg opacity-90">{selectedUnit.description}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Button variant="secondary" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Capa
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-muted/30">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Membros</p>
                        <p className="text-2xl font-bold">{selectedUnit.members ? selectedUnit.members.length : 0}</p>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Documentos</p>
                        <p className="text-2xl font-bold">{documents.length}</p>
                      </div>
                      <FileText className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Subáreas</p>
                        <p className="text-2xl font-bold">{selectedUnit.children ? selectedUnit.children.length : 0}</p>
                      </div>
                      <Building2 className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="text-xl font-bold">{selectedUnit.isActive ? "Ativo" : "Inativo"}</p>
                      </div>
                      <Badge variant={selectedUnit.isActive ? "default" : "outline"} className="h-8 px-3">
                        {selectedUnit.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="people">Pessoas {showPeople && `(${selectedUnit.members ? selectedUnit.members.length : 0})`}</TabsTrigger>
                    <TabsTrigger value="documents">Documentos {showDocuments && `(${filteredDocuments.length})`}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Department Info */}
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Target className="h-5 w-5 mr-2" />
                            Missão & Informações
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Missão</h4>
                            <p className="text-muted-foreground">
                              Impulsionar o crescimento da empresa através de estratégias inovadoras e relacionamentos sólidos com clientes.
                            </p>
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">departamento@empresa.com</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">+55 11 3456-7890</span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">Edifício Principal - 3º Andar</span>
                              </div>
                              <div className="flex items-center">
                                <Crown className="h-4 w-4 mr-2 text-yellow-500" />
                                <span className="text-sm">Gestor: {selectedUnit.members?.[0]?.name || 'Não definido'}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Quick Actions */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Ações Rápidas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button className="w-full justify-start">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Adicionar Membro
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Criar Comunicado
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Documento
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Settings className="h-4 w-4 mr-2" />
                            Configurações
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="people" className="mt-6">
                    {showPeople && selectedUnit.members ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">Membros da Equipe</h3>
                          <Button>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Adicionar Membro
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedUnit.members.map(member => (
                            <Card key={member.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>
                                      {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center">
                                      <p className="font-medium">{member.name}</p>
                                      {member.isManager && (
                                        <Crown className="h-4 w-4 text-yellow-500 ml-2" />
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                    <p className="text-xs text-muted-foreground">{member.email}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Nenhum membro encontrado</h3>
                        <p className="text-muted-foreground mb-4">Esta estrutura ainda não possui membros cadastrados</p>
                        <Button>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Adicionar Primeiro Membro
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="documents" className="mt-6">
                    {showDocuments ? (
                      <div className="space-y-6">
                        {/* Document Controls */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input
                                placeholder="Buscar documentos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-64"
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                            >
                              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
                            </Button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <Folder className="h-4 w-4 mr-2" />
                                  Nova Pasta
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Criar Nova Pasta</DialogTitle>
                                  <DialogDescription>
                                    Crie uma nova pasta para organizar documentos.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <Input placeholder="Nome da pasta" />
                                  <RadioGroup defaultValue="organization" className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="general" id="general" />
                                      <Label htmlFor="general" className="flex items-center cursor-pointer">
                                        <span className="font-medium">Geral</span>
                                        <span className="text-muted-foreground text-xs ml-2">
                                          - Acessível a todos na empresa
                                        </span>
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="organization" id="organization" />
                                      <Label htmlFor="organization" className="flex items-center cursor-pointer">
                                        <span className="font-medium">Restrito à Estrutura</span>
                                        <span className="text-muted-foreground text-xs ml-2">
                                          - Apenas pessoas vinculadas a esta estrutura
                                        </span>
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="specific" id="specific" />
                                      <Label htmlFor="specific" className="flex items-center cursor-pointer">
                                        <span className="font-medium">Pessoas Específicas</span>
                                        <span className="text-muted-foreground text-xs ml-2">
                                          - Selecionar indivíduos específicos
                                        </span>
                                      </Label>
                                    </div>
                                  </RadioGroup>
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
                            
                            <Button>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </div>

                        {/* Breadcrumb */}
                        {renderBreadcrumb()}

                        {/* Folder Navigation */}
                        {!currentFolder && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Pastas</h4>
                            {renderFolderTree(folders)}
                          </div>
                        )}

                        {/* Documents Display */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-lg">Documentos ({filteredDocuments.length})</h4>
                            {currentFolder && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={navigateBack}
                                disabled={currentFolderPath.length === 0}
                              >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Voltar
                              </Button>
                            )}
                          </div>
                          {filteredDocuments.length > 0 ? (
                            <div className={viewMode === 'grid' 
                              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
                              : "space-y-2"
                            }>
                              {filteredDocuments.map(doc => (
                                <Card key={doc.id} className={`hover:shadow-md transition-shadow ${viewMode === 'grid' ? "" : "p-0"}`}>
                                  <CardContent className={viewMode === 'grid' ? "p-4" : "p-3"}>
                                    <div className={viewMode === 'grid' 
                                      ? "space-y-3" 
                                      : "flex items-center justify-between"
                                    }>
                                      <div className={viewMode === 'grid' ? "space-y-2" : "flex items-center space-x-3"}>
                                        <div className="flex items-center space-x-2">
                                          <File className="h-4 w-4 text-muted-foreground" />
                                          <span className="font-medium text-sm">{doc.name}</span>
                                          {doc.isStarred && <Star className="h-3 w-3 text-yellow-500" />}
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                          <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                                          <span className="text-xs text-muted-foreground">{doc.size}</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
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
                                                  className={`text-xs cursor-help ${
                                                    doc.sharingType === 'general' 
                                                      ? "bg-green-100 text-green-800" 
                                                      : doc.sharingType === 'specific'
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-blue-100 text-blue-800"
                                                  }`}
                                                >
                                                  {doc.sharingType === 'general' 
                                                    ? "Geral" 
                                                    : doc.sharingType === 'specific' 
                                                      ? "Específico" 
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
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center space-x-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <Download className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <Share2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    {viewMode === 'grid' && (
                                      <div className="text-xs text-muted-foreground mt-2">
                                        Modificado em {new Date(doc.lastModified).toLocaleDateString('pt-BR')}
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                              <h3 className="text-lg font-semibold mb-2">
                                {searchTerm ? "Nenhum documento encontrado" : "Nenhum documento nesta pasta"}
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                {searchTerm ? "Tente ajustar sua busca" : "Comece fazendo upload de documentos"}
                              </p>
                              {!searchTerm && (
                                <Button>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Fazer Upload
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Visualização de documentos desabilitada</h3>
                        <p className="text-muted-foreground">Entre em contato com o administrador para habilitar esta funcionalidade</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Building2 className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
                <h3 className="text-2xl font-semibold mb-3">Selecione uma estrutura</h3>
                <p className="text-muted-foreground max-w-md">
                  Clique em uma estrutura organizacional na barra lateral para visualizar seus detalhes, membros e documentos
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Craft.js Settings Component
const OrganizationalStructureSettings = () => {
  const {
    actions: { setProp },
    title,
    description,
    showDocuments,
    showPeople
  } = useNode((node) => ({
    title: node.data.props.title,
    description: node.data.props.description,
    showDocuments: node.data.props.showDocuments,
    showPeople: node.data.props.showPeople
  }));

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Título</label>
        <Input
          value={title}
          onChange={(e) => setProp((props: any) => (props.title = e.target.value))}
          placeholder="Título do componente"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Descrição</label>
        <Textarea
          value={description}
          onChange={(e) => setProp((props: any) => (props.description = e.target.value))}
          placeholder="Descrição do componente"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showDocuments}
          onChange={(e) => setProp((props: any) => (props.showDocuments = e.target.checked))}
        />
        <label className="text-sm font-medium">Mostrar Documentos</label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showPeople}
          onChange={(e) => setProp((props: any) => (props.showPeople = e.target.checked))}
        />
        <label className="text-sm font-medium">Mostrar Pessoas</label>
      </div>
    </div>
  );
};

// Craft.js configuration
(OrganizationalStructure as any).craft = {
  displayName: 'Estrutura Organizacional',
  props: {
    title: 'Estrutura Organizacional',
    description: 'Visualize e gerencie a estrutura organizacional da empresa',
    showDocuments: true,
    showPeople: true
  },
  related: {
    settings: OrganizationalStructureSettings
  }
};