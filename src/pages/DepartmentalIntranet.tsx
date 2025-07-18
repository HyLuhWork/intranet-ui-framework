import React, { useState } from 'react';
import { 
  Users, FileText, Settings, Search, Plus, Bell, Calendar, 
  MapPin, Phone, Mail, Target, Eye, TrendingUp, Award, 
  Clock, Download, Share2, Edit, UserPlus, MessageSquare,
  Home, Building2, Briefcase, BookOpen, HeadphonesIcon,
  ChevronDown, ChevronRight, Crown, Filter, Grid3X3, List,
  Upload, Folder, File, Star, MoreVertical, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import orgStructureCover from '@/assets/org-structure-cover.jpg';

// Interfaces
interface Department {
  id: string;
  name: string;
  description: string;
  mission: string;
  manager: Person;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  stats: {
    totalMembers: number;
    totalDocuments: number;
    activeProjects: number;
    completionRate: number;
  };
  members: Person[];
  coverImage: string;
  color: string;
}

interface Person {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  isManager: boolean;
  department: string;
  joinDate: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  owner: Person;
  isStarred: boolean;
  sharingType: 'general' | 'specific' | 'organization';
  downloadCount: number;
}

interface Folder {
  id: string;
  name: string;
  documents: Document[];
  subFolders?: Folder[];
  owner: Person;
  sharingType: 'general' | 'specific' | 'organization';
  isExpanded?: boolean;
}

// Sample data
const samplePeople: Person[] = [
  {
    id: '1',
    name: 'Maria Silva',
    role: 'Gerente de Vendas',
    email: 'maria.silva@empresa.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isManager: true,
    department: 'Vendas',
    joinDate: '2021-03-15'
  },
  {
    id: '2',
    name: 'João Santos',
    role: 'Representante de Vendas',
    email: 'joao.santos@empresa.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isManager: false,
    department: 'Vendas',
    joinDate: '2022-01-20'
  },
  {
    id: '3',
    name: 'Ana Oliveira',
    role: 'Analista de Vendas',
    email: 'ana.oliveira@empresa.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isManager: false,
    department: 'Vendas',
    joinDate: '2023-05-10'
  },
  {
    id: '4',
    name: 'Carlos Lima',
    role: 'Coordenador de Vendas',
    email: 'carlos.lima@empresa.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    isManager: false,
    department: 'Vendas',
    joinDate: '2022-08-03'
  }
];

const sampleDepartments: Department[] = [
  {
    id: '1',
    name: 'Vendas',
    description: 'Responsável pela geração de receita e relacionamento com clientes',
    mission: 'Impulsionar o crescimento da empresa através de estratégias de vendas inovadoras e relacionamentos sólidos com clientes.',
    manager: samplePeople[0],
    contact: {
      email: 'vendas@empresa.com',
      phone: '+55 11 3456-7890',
      location: 'Edifício Principal - 3º Andar'
    },
    stats: {
      totalMembers: 12,
      totalDocuments: 248,
      activeProjects: 8,
      completionRate: 87
    },
    members: samplePeople,
    coverImage: orgStructureCover,
    color: 'blue'
  }
];

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'Relatório de Vendas Q4 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-01-15',
    owner: samplePeople[0],
    isStarred: true,
    sharingType: 'organization',
    downloadCount: 45
  },
  {
    id: '2',
    name: 'Estratégia de Vendas 2024.pptx',
    type: 'PPTX',
    size: '5.1 MB',
    lastModified: '2024-01-10',
    owner: samplePeople[0],
    isStarred: false,
    sharingType: 'specific',
    downloadCount: 23
  },
  {
    id: '3',
    name: 'Lista de Clientes Ativos.xlsx',
    type: 'XLSX',
    size: '1.8 MB',
    lastModified: '2024-01-12',
    owner: samplePeople[1],
    isStarred: true,
    sharingType: 'organization',
    downloadCount: 67
  }
];

const sampleFolders: Folder[] = [
  {
    id: '1',
    name: 'Relatórios',
    documents: sampleDocuments.slice(0, 2),
    owner: samplePeople[0],
    sharingType: 'organization',
    isExpanded: true
  },
  {
    id: '2',
    name: 'Treinamentos',
    documents: sampleDocuments.slice(2, 3),
    owner: samplePeople[0],
    sharingType: 'general',
    isExpanded: false
  }
];

const DepartmentalIntranet: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(sampleDepartments[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const filteredDocuments = selectedFolder 
    ? selectedFolder.documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sampleDocuments.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const getSharingBadgeColor = (type: string) => {
    switch (type) {
      case 'general': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'specific': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'organization': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getSharingText = (type: string) => {
    switch (type) {
      case 'general': return 'Geral';
      case 'specific': return 'Específico';
      case 'organization': return 'Organização';
      default: return 'Desconhecido';
    }
  };

  const renderSidebar = () => (
    <div className={`bg-card border-r transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <h2 className="text-lg font-semibold">Intranet</h2>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
          </Button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${sidebarCollapsed ? 'px-3' : ''}`}
        >
          <Home className="h-4 w-4" />
          {!sidebarCollapsed && <span className="ml-2">Início</span>}
        </Button>
        
        <Button 
          variant="secondary" 
          className={`w-full justify-start ${sidebarCollapsed ? 'px-3' : ''}`}
        >
          <Building2 className="h-4 w-4" />
          {!sidebarCollapsed && <span className="ml-2">Departamentos</span>}
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${sidebarCollapsed ? 'px-3' : ''}`}
        >
          <Users className="h-4 w-4" />
          {!sidebarCollapsed && <span className="ml-2">Pessoas</span>}
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${sidebarCollapsed ? 'px-3' : ''}`}
        >
          <FileText className="h-4 w-4" />
          {!sidebarCollapsed && <span className="ml-2">Documentos</span>}
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${sidebarCollapsed ? 'px-3' : ''}`}
        >
          <Calendar className="h-4 w-4" />
          {!sidebarCollapsed && <span className="ml-2">Calendário</span>}
        </Button>

        {!sidebarCollapsed && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-2">Departamentos</h3>
              {sampleDepartments.map((dept) => (
                <Button
                  key={dept.id}
                  variant={selectedDepartment.id === dept.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedDepartment(dept)}
                >
                  <div className={`w-3 h-3 rounded-full bg-${dept.color}-500 mr-2`} />
                  {dept.name}
                </Button>
              ))}
            </div>
          </>
        )}
      </nav>
    </div>
  );

  const renderHeader = () => (
    <header className="bg-card border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold">{selectedDepartment.name}</h1>
            <p className="text-muted-foreground">Departamento • {selectedDepartment.stats.totalMembers} membros</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?img=5" />
            <AvatarFallback>EU</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );

  const renderDepartmentBanner = () => (
    <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
      <img 
        src={selectedDepartment.coverImage} 
        alt={selectedDepartment.name}
        className="w-full h-full object-cover mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-6 left-6 text-white">
        <h2 className="text-3xl font-bold mb-2">{selectedDepartment.name}</h2>
        <p className="text-lg opacity-90">{selectedDepartment.description}</p>
      </div>
      <div className="absolute top-4 right-4">
        <Button variant="secondary" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Editar Capa
        </Button>
      </div>
    </div>
  );

  const renderQuickStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Membros</p>
              <p className="text-2xl font-bold">{selectedDepartment.stats.totalMembers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Documentos</p>
              <p className="text-2xl font-bold">{selectedDepartment.stats.totalDocuments}</p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Projetos Ativos</p>
              <p className="text-2xl font-bold">{selectedDepartment.stats.activeProjects}</p>
            </div>
            <Briefcase className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
              <p className="text-2xl font-bold">{selectedDepartment.stats.completionRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
          <Progress value={selectedDepartment.stats.completionRate} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );

  const renderOverviewTab = () => (
    <div className="space-y-6">
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
              <p className="text-muted-foreground">{selectedDepartment.mission}</p>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{selectedDepartment.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{selectedDepartment.contact.phone}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{selectedDepartment.contact.location}</span>
                </div>
                <div className="flex items-center">
                  <Crown className="h-4 w-4 mr-2 text-yellow-500" />
                  <span className="text-sm">Gerente: {selectedDepartment.manager.name}</span>
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={samplePeople[0].avatar} />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{samplePeople[0].name}</span> 
                  {' '}adicionou um novo documento
                </p>
                <p className="text-xs text-muted-foreground">há 2 horas</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={samplePeople[1].avatar} />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{samplePeople[1].name}</span> 
                  {' '}atualizou o relatório mensal
                </p>
                <p className="text-xs text-muted-foreground">há 4 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPeopleTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Membros do Departamento</h3>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Adicionar Membro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedDepartment.members.map((person) => (
          <Card key={person.id}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={person.avatar} />
                    <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {person.isManager && (
                    <div className="absolute -top-1 -right-1">
                      <Crown className="h-4 w-4 text-yellow-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{person.name}</h4>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                  <p className="text-xs text-muted-foreground">{person.email}</p>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center border rounded-md">
            <Button 
              variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
          
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Folders */}
      <div className="space-y-4">
        <h4 className="font-semibold">Pastas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleFolders.map((folder) => (
            <Card 
              key={folder.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setSelectedFolder(folder)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Folder className="h-8 w-8 text-blue-500" />
                  <div className="flex-1">
                    <h5 className="font-medium">{folder.name}</h5>
                    <p className="text-xs text-muted-foreground">{folder.documents.length} documentos</p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <Badge className={getSharingBadgeColor(folder.sharingType)}>
                    {getSharingText(folder.sharingType)}
                  </Badge>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={folder.owner.avatar} />
                          <AvatarFallback className="text-xs">
                            {folder.owner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Proprietário: {folder.owner.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">
            {selectedFolder ? `Documentos em ${selectedFolder.name}` : 'Documentos Recentes'}
          </h4>
          {selectedFolder && (
            <Button variant="outline" size="sm" onClick={() => setSelectedFolder(null)}>
              Voltar
            </Button>
          )}
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <File className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h5 className="font-medium">{doc.name}</h5>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Modificado em {doc.lastModified}</span>
                          <span>•</span>
                          <span>{doc.downloadCount} downloads</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {doc.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      
                      <Badge className={getSharingBadgeColor(doc.sharingType)}>
                        {getSharingText(doc.sharingType)}
                      </Badge>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={doc.owner.avatar} />
                              <AvatarFallback className="text-xs">
                                {doc.owner.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Proprietário: {doc.owner.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <File className="h-8 w-8 text-muted-foreground" />
                    {doc.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  </div>
                  
                  <h5 className="font-medium mb-2 line-clamp-2">{doc.name}</h5>
                  
                  <div className="text-xs text-muted-foreground mb-3">
                    <p>{doc.size}</p>
                    <p>{doc.lastModified}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className={getSharingBadgeColor(doc.sharingType)}>
                      {getSharingText(doc.sharingType)}
                    </Badge>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={doc.owner.avatar} />
                            <AvatarFallback className="text-xs">
                              {doc.owner.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Proprietário: {doc.owner.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex w-full">
      {renderSidebar()}
      
      <div className="flex-1 flex flex-col">
        {renderHeader()}
        
        <main className="flex-1">
          {renderDepartmentBanner()}
          {renderQuickStats()}
          
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="people">Pessoas</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                <TabsContent value="overview">
                  {renderOverviewTab()}
                </TabsContent>
                
                <TabsContent value="people">
                  {renderPeopleTab()}
                </TabsContent>
                
                <TabsContent value="documents">
                  {renderDocumentsTab()}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DepartmentalIntranet;