import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building2, Users, ClipboardList, TrendingUp, Shield, Plus, User, MapPin, Phone, Mail, FileText, CheckCircle2, Home, Settings, UserCheck, DollarSign, BarChart3, Hammer, Globe } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

export default function LocaPilotDashboard() {
  const [userRole, setUserRole] = useState<string | null>(null);

  const [property, setProperty] = useState('');
  const [properties, setProperties] = useState<string[]>([]);
  const [tenants, setTenants] = useState<{
    id: number;
    name: string;
    unit: string;
    email: string;
    phone: string;
    notes: string;
    active: boolean;
    nas: string;
    smoker: boolean;
    tenantAddress: string;
    leaseManager: string;
    property: string;
  }[]>([]);
  const [tasks, setTasks] = useState<{
    id: number;
    content: string;
    done: boolean;
  }[]>([]);
  const [taskInput, setTaskInput] = useState('');

  // Tenant form fields
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [active, setActive] = useState(true);
  const [nas, setNas] = useState('');
  const [smoker, setSmoker] = useState(false);
  const [tenantAddress, setTenantAddress] = useState('');
  const [leaseManager, setLeaseManager] = useState('');

  // Mock data for owner dashboard
  const mockDashboardData = {
    occupancyData: [
      { name: 'Occupés', value: 85, color: '#22c55e' },
      { name: 'Vacant', value: 15, color: '#ef4444' }
    ],
    profitabilityData: [
      { property: 'Tour Centre-Ville', rent: 45000, costs: 25000, profit: 20000 },
      { property: 'Résidence Plateau', rent: 32000, costs: 18000, profit: 14000 },
      { property: 'Complexe Ouest', rent: 28000, costs: 15000, profit: 13000 },
      { property: 'Maisons Verdun', rent: 22000, costs: 12000, profit: 10000 }
    ],
    monthlyRevenueData: [
      { month: 'Jan', revenue: 127000, expenses: 70000 },
      { month: 'Fév', revenue: 125000, expenses: 68000 },
      { month: 'Mar', revenue: 132000, expenses: 72000 },
      { month: 'Avr', revenue: 128000, expenses: 69000 },
      { month: 'Mai', revenue: 135000, expenses: 74000 },
      { month: 'Jun', revenue: 142000, expenses: 76000 }
    ],
    renovationProjects: [
      { id: 1, property: 'Tour Centre-Ville', project: 'Rénovation cuisine Apt 504', status: 'En cours', progress: 65 },
      { id: 2, property: 'Résidence Plateau', project: 'Peinture hall d\'entrée', status: 'En cours', progress: 90 },
      { id: 3, property: 'Complexe Ouest', project: 'Réparation toiture', status: 'Planifié', progress: 0 }
    ],
    propertyLocations: [
      { id: 1, name: 'Tour Centre-Ville', city: 'Montréal', country: 'Canada', lat: 45.5017, lng: -73.5673, units: 120 },
      { id: 2, name: 'Résidence Plateau', city: 'Montréal', country: 'Canada', lat: 45.5200, lng: -73.5800, units: 85 },
      { id: 3, name: 'Complexe Ouest', city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, units: 95 },
      { id: 4, name: 'Maisons Verdun', city: 'Montréal', country: 'Canada', lat: 45.4581, lng: -73.5678, units: 45 }
    ]
  };

  const addProperty = () => {
    if (property.trim()) {
      setProperties([...properties, property.trim()]);
      setProperty('');
    }
  };

  const addTenant = () => {
    if (name.trim() && unit.trim()) {
      const associatedProperty = properties.find(p => property === p);
      setTenants([...tenants, {
        id: Date.now(),
        name: name.trim(),
        unit: unit.trim(),
        email: email.trim(),
        phone: phone.trim(),
        notes: notes.trim(),
        active,
        nas: nas.trim(),
        smoker,
        tenantAddress: tenantAddress.trim(),
        leaseManager: leaseManager.trim(),
        property: associatedProperty || property
      }]);

      // Reset form
      setName('');
      setUnit('');
      setEmail('');
      setPhone('');
      setNotes('');
      setNas('');
      setSmoker(false);
      setTenantAddress('');
      setLeaseManager('');
      setActive(true);
    }
  };

  const addTaskReminder = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { 
        id: Date.now(),
        content: taskInput.trim(), 
        done: false 
      }]);
      setTaskInput('');
    }
  };

  const toggleTaskDone = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  };

  const roleConfig = {
    proprietaire: {
      title: 'Propriétaire',
      icon: Home,
      color: 'bg-blue-500',
      accent: 'border-blue-200 bg-blue-50'
    },
    locataire: {
      title: 'Locataire',
      icon: User,
      color: 'bg-green-500',
      accent: 'border-green-200 bg-green-50'
    },
    entretien: {
      title: 'Personnel d\'entretien',
      icon: Settings,
      color: 'bg-orange-500',
      accent: 'border-orange-200 bg-orange-50'
    },
    admin: {
      title: 'Administrateur',
      icon: UserCheck,
      color: 'bg-purple-500',
      accent: 'border-purple-200 bg-purple-50'
    }
  };

  const renderOwnerDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LocaPilot
              </h1>
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full border-blue-200 bg-blue-50">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Propriétaire</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setUserRole(null)}
              className="hover:bg-slate-100"
            >
              Changer de portail
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Dashboard Overview Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Tableau de Bord Propriétaire</h2>
          <p className="text-slate-600">Vue d'ensemble de votre portefeuille immobilier</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Revenus Mensuels</p>
                  <p className="text-3xl font-bold text-green-800">142 000 $</p>
                  <p className="text-xs text-green-600">+8.5% vs mois dernier</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Taux d'Occupation</p>
                  <p className="text-3xl font-bold text-blue-800">85%</p>
                  <p className="text-xs text-blue-600">345/406 unités occupées</p>
                </div>
                <Home className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Profit Net</p>
                  <p className="text-3xl font-bold text-purple-800">66 000 $</p>
                  <p className="text-xs text-purple-600">Marge: 46.5%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Projets Actifs</p>
                  <p className="text-3xl font-bold text-orange-800">3</p>
                  <p className="text-xs text-orange-600">2 en cours, 1 planifié</p>
                </div>
                <Hammer className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Occupancy Chart */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Taux d'Occupation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockDashboardData.occupancyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {mockDashboardData.occupancyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Profitability Chart */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Rentabilité par Propriété</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockDashboardData.profitabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="property" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${value} $`, '']} />
                    <Bar dataKey="rent" fill="#3b82f6" name="Loyers" />
                    <Bar dataKey="costs" fill="#ef4444" name="Coûts" />
                    <Bar dataKey="profit" fill="#22c55e" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend and Renovation Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Trend */}
          <Card className="lg:col-span-2 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <span>Évolution des Revenus</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockDashboardData.monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${value} $`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenus" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Dépenses" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Renovation Projects */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Hammer className="w-5 h-5 text-orange-600" />
                <span>Projets de Rénovation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDashboardData.renovationProjects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-800">{project.project}</p>
                        <p className="text-xs text-slate-600">{project.property}</p>
                      </div>
                      <Badge variant={project.status === 'En cours' ? 'default' : 'secondary'} className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Progression</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* World Map of Properties */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              <span>Localisation des Propriétés</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 min-h-[300px] relative overflow-hidden">
              {/* Simplified world map representation */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  <path d="M150,100 Q200,80 250,100 T350,120 Q400,110 450,100 T550,90 Q600,85 650,90 T750,100 Q800,95 850,100" 
                        stroke="#3b82f6" strokeWidth="2" fill="none" />
                  <path d="M100,200 Q200,180 300,200 T500,220 Q600,210 700,200 T900,190" 
                        stroke="#3b82f6" strokeWidth="2" fill="none" />
                  <path d="M200,300 Q300,280 400,300 T600,320 Q700,310 800,300" 
                        stroke="#3b82f6" strokeWidth="2" fill="none" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockDashboardData.propertyLocations.map((location) => (
                    <div key={location.id} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 text-sm">{location.name}</h4>
                          <p className="text-xs text-slate-600 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {location.city}, {location.country}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {location.units} unités
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(location.units / 120) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Taille relative du complexe</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600">
                    Portefeuille total: <span className="font-semibold">345 unités</span> réparties sur 
                    <span className="font-semibold"> 4 propriétés</span> dans 
                    <span className="font-semibold"> 2 villes</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Actions Rapides</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une propriété
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Enregistrer un locataire
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Voir rapports détaillés
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-slate-800 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold">Sécurité & Confidentialité</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Toutes les données sont protégées par chiffrement de niveau bancaire et stockées de manière sécurisée. 
                L'accès est strictement contrôlé selon les rôles utilisateurs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderRoleSelector = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            LocaPilot
          </CardTitle>
          <p className="text-xl text-slate-600 font-medium">Choisissez votre portail</p>
          <p className="text-slate-500">Gestion immobilière simplifiée et intelligente</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(roleConfig).map(([key, config]) => {
              const IconComponent = config.icon;
              return (
                <Button
                  key={key}
                  variant="outline"
                  onClick={() => setUserRole(key)}
                  className={`h-24 flex-col space-y-2 hover:scale-105 transition-all duration-200 border-2 ${config.accent} hover:shadow-lg group`}
                >
                  <div className={`p-2 rounded-full ${config.color} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">{config.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Show owner dashboard first if owner role selected
  if (userRole === 'proprietaire') return renderOwnerDashboard();

  if (!userRole) return renderRoleSelector();

  const currentRole = roleConfig[userRole as keyof typeof roleConfig];
  const IconComponent = currentRole.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LocaPilot
              </h1>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${currentRole.accent}`}>
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium">{currentRole.title}</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setUserRole(null)}
              className="hover:bg-slate-100"
            >
              Changer de portail
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Property Management - Admin & Proprietaire */}
        {(userRole === 'admin' || userRole === 'proprietaire') && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Gestion des Immeubles</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Nom ou adresse de l'immeuble"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addProperty()}
                />
                <Button onClick={addProperty} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
              
              {properties.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700">Immeubles enregistrés:</h4>
                  <div className="flex flex-wrap gap-2">
                    {properties.map((prop, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        <Building2 className="w-3 h-3 mr-1" />
                        {prop}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tenant Management - Admin & Proprietaire */}
        {(userRole === 'admin' || userRole === 'proprietaire') && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800">
                <Users className="w-5 h-5 text-green-600" />
                <span>Ajouter un Locataire</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">Nom complet</Label>
                  <Input 
                    id="name"
                    placeholder="Jean Dupont" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-sm font-medium text-slate-700">Unité</Label>
                  <Input 
                    id="unit"
                    placeholder="Apt 201" 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nas" className="text-sm font-medium text-slate-700">NAS</Label>
                  <Input 
                    id="nas"
                    placeholder="123-456-789" 
                    value={nas} 
                    onChange={(e) => setNas(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Courriel</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="jean@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Téléphone</Label>
                  <Input 
                    id="phone"
                    placeholder="(514) 123-4567" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tenantAddress" className="text-sm font-medium text-slate-700">Adresse du locataire</Label>
                  <Input 
                    id="tenantAddress"
                    placeholder="123 Rue Example" 
                    value={tenantAddress} 
                    onChange={(e) => setTenantAddress(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <Label htmlFor="leaseManager" className="text-sm font-medium text-slate-700">Responsable du bail</Label>
                  <Input 
                    id="leaseManager"
                    placeholder="Marie Gestionnaire" 
                    value={leaseManager} 
                    onChange={(e) => setLeaseManager(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <Label htmlFor="notes" className="text-sm font-medium text-slate-700">Notes</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Notes additionnelles..." 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)} 
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch checked={smoker} onCheckedChange={setSmoker} />
                    <Label className="text-sm text-slate-700">Fumeur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={active} onCheckedChange={setActive} />
                    <Label className="text-sm text-slate-700">Actif</Label>
                  </div>
                </div>
                <Button onClick={addTenant} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter le locataire
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tenants List */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Liste des Locataires</span>
              <Badge variant="outline" className="ml-auto">{tenants.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tenants.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Aucun locataire ajouté pour le moment.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {tenants.map((tenant) => (
                  <div key={tenant.id} className="border rounded-xl p-6 bg-gradient-to-r from-slate-50 to-white hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-slate-800">{tenant.name}</h3>
                        <p className="text-slate-600 flex items-center">
                          <Home className="w-4 h-4 mr-1" />
                          Unité {tenant.unit}
                        </p>
                      </div>
                      <Badge variant={tenant.active ? "default" : "destructive"}>
                        {tenant.active ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      {tenant.email && (
                        <div className="flex items-center text-slate-600">
                          <Mail className="w-4 h-4 mr-2 text-blue-500" />
                          {tenant.email}
                        </div>
                      )}
                      {tenant.phone && (
                        <div className="flex items-center text-slate-600">
                          <Phone className="w-4 h-4 mr-2 text-green-500" />
                          {tenant.phone}
                        </div>
                      )}
                      {tenant.tenantAddress && (
                        <div className="flex items-center text-slate-600">
                          <MapPin className="w-4 h-4 mr-2 text-red-500" />
                          {tenant.tenantAddress}
                        </div>
                      )}
                      {tenant.nas && (
                        <div className="text-slate-600">
                          <span className="font-medium">NAS:</span> {tenant.nas}
                        </div>
                      )}
                      <div className="text-slate-600">
                        <span className="font-medium">Fumeur:</span> {tenant.smoker ? 'Oui' : 'Non'}
                      </div>
                      {tenant.leaseManager && (
                        <div className="text-slate-600">
                          <span className="font-medium">Responsable:</span> {tenant.leaseManager}
                        </div>
                      )}
                      {tenant.property && (
                        <div className="text-slate-600">
                          <span className="font-medium">Immeuble:</span> {tenant.property}
                        </div>
                      )}
                    </div>
                    
                    {tenant.notes && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-start">
                          <FileText className="w-4 h-4 mr-2 text-slate-500 mt-0.5" />
                          <p className="text-slate-700 text-sm italic">{tenant.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Task Management - Admin & Entretien */}
        {(userRole === 'admin' || userRole === 'entretien') && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800">
                <ClipboardList className="w-5 h-5 text-orange-600" />
                <span>Rappels de Tâches</span>
                <Badge variant="outline" className="ml-auto">{tasks.filter(t => !t.done).length} en cours</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Nouvelle tâche de maintenance..." 
                  value={taskInput} 
                  onChange={(e) => setTaskInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTaskReminder()}
                  className="flex-1"
                />
                <Button onClick={addTaskReminder} className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
              
              {tasks.length > 0 ? (
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer hover:shadow-sm ${
                        task.done ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'
                      }`}
                      onClick={() => toggleTaskDone(task.id)}
                    >
                      <CheckCircle2 className={`w-5 h-5 ${task.done ? 'text-green-600' : 'text-slate-300'}`} />
                      <span className={`flex-1 ${task.done ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                        {task.content}
                      </span>
                      {task.done && <Badge variant="secondary" className="text-xs">Terminé</Badge>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Aucune tâche en cours.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Security Footer */}
        <Card className="shadow-lg border-0 bg-slate-800 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold">Sécurité & Confidentialité</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Toutes les données sont protégées par chiffrement de niveau bancaire et stockées de manière sécurisée. 
              L'accès est strictement contrôlé selon les rôles utilisateurs. Conformité RGPD et respect de la vie privée garantis.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}