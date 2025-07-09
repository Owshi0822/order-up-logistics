import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, ShoppingCart, Truck, Mail, Calendar, DollarSign, User, AlertCircle, Search, Menu, Package, Building2, Eye, Github, LogIn } from "lucide-react";
import MRFForm from "@/components/MRFForm";
import QuotationManager from "@/components/QuotationManager";
import PurchaseOrderManager from "@/components/PurchaseOrderManager";
import DeliveryCoordinator from "@/components/DeliveryCoordinator";
import SupplierSourcing from "@/components/SupplierSourcing";
import EmailTemplates from "@/components/EmailTemplates";
import InventoryManager from "@/components/InventoryManager";
import EnterpriseIntegration from "@/components/EnterpriseIntegration";
import GuestPortfolio from "@/components/GuestPortfolio";
import AuthModal from "@/components/AuthModal";
import UserAccountMenu from "@/components/UserAccountMenu";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ProcessItem {
  id: string;
  type: 'MRF' | 'Quotation' | 'PO' | 'Delivery';
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';
  amount?: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assignee: string;
}

const Index = () => {
  const { toast } = useToast();
  const { user, isAuthenticated, signIn, signOut, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [processes] = useState<ProcessItem[]>([
    {
      id: "MRF-001",
      type: "MRF",
      title: "Office Supplies Request",
      description: "Printer paper, pens, and folders for Q1",
      status: "pending",
      priority: "medium",
      dueDate: "2024-01-15",
      assignee: "John Doe (PIC)"
    },
    {
      id: "PO-002",
      type: "PO",
      title: "Construction Materials",
      description: "Steel pipes and fittings for Site A",
      status: "in-progress",
      amount: 45000,
      priority: "high",
      dueDate: "2024-01-20",
      assignee: "Finance Manager"
    },
    {
      id: "QUO-003",
      type: "Quotation",
      title: "IT Equipment Quote",
      description: "Laptops and monitors for new hires",
      status: "pending",
      amount: 15000,
      priority: "medium",
      dueDate: "2024-01-18",
      assignee: "Procurement Team"
    }
  ]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication required state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4 lg:py-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                  Procurement System
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  Internal logistics and purchasing platform
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <ThemeToggle />
                <Button variant="outline" size="sm" onClick={() => setIsGuestMode(true)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Portfolio View
                </Button>
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>

        {isGuestMode ? (
          <div className="relative">
            <div className="absolute top-4 right-4 z-50">
              <Button 
                onClick={() => setIsGuestMode(false)}
                variant="outline"
                className="bg-white/90 backdrop-blur-sm"
              >
                Back to App
              </Button>
            </div>
            <GuestPortfolio />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Welcome to Procurement System</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Please sign in to access the procurement management platform
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-semibold mb-2">Material Request Forms</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Create and manage purchase requests</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h3 className="font-semibold mb-2">Purchase Orders</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Track orders and deliveries</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Package className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="font-semibold mb-2">Inventory Management</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Monitor stock levels and availability</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button size="lg" onClick={() => setIsAuthModalOpen(true)} className="mt-8">
                <LogIn className="h-5 w-5 mr-2" />
                Get Started - Sign In
              </Button>
            </div>
          </div>
        )}

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={signIn}
        />
      </div>
    );
  }

  // If in guest mode, show portfolio
  if (isGuestMode) {
    return (
      <div className="relative">
        <div className="absolute top-4 right-4 z-50">
          <Button 
            onClick={() => setIsGuestMode(false)}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
          >
            Back to App
          </Button>
        </div>
        <GuestPortfolio />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'MRF': return <FileText className="h-4 w-4" />;
      case 'Quotation': return <DollarSign className="h-4 w-4" />;
      case 'PO': return <ShoppingCart className="h-4 w-4" />;
      case 'Delivery': return <Truck className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const stats = {
    pendingApprovals: processes.filter(p => p.status === 'pending').length,
    activeOrders: processes.filter(p => p.status === 'in-progress').length,
    completedToday: 3,
    totalValue: processes.reduce((sum, p) => sum + (p.amount || 0), 0)
  };

  const TabsNavigation = () => (
    <TabsList className="grid w-full grid-cols-3 lg:grid-cols-8 gap-1">
      <TabsTrigger value="dashboard" className="text-xs sm:text-sm">Dashboard</TabsTrigger>
      <TabsTrigger value="mrf" className="text-xs sm:text-sm">MRF</TabsTrigger>
      <TabsTrigger value="quotations" className="text-xs sm:text-sm">Quotes</TabsTrigger>
      <TabsTrigger value="purchase-orders" className="text-xs sm:text-sm">PO</TabsTrigger>
      <TabsTrigger value="suppliers" className="text-xs sm:text-sm">Suppliers</TabsTrigger>
      <TabsTrigger value="inventory" className="text-xs sm:text-sm">Inventory</TabsTrigger>
      <TabsTrigger value="email" className="text-xs sm:text-sm">Email</TabsTrigger>
      <TabsTrigger value="enterprise" className="text-xs sm:text-sm">ERP</TabsTrigger>
    </TabsList>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile-First Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                Procurement System
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 hidden sm:block">
                Internal logistics and purchasing platform
              </p>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={() => setIsGuestMode(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Portfolio View
              </Button>
              <Button variant="outline" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("email")}>
                <Mail className="h-4 w-4 mr-2" />
                Email Center
              </Button>
              <UserAccountMenu user={user!} onSignOut={signOut} />
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              <ThemeToggle />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="space-y-4 py-4">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setIsGuestMode(true)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Portfolio View
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub Repository
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("email")}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email Center
                    </Button>
                    <div className="pt-4">
                      <UserAccountMenu user={user!} onSignOut={signOut} />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 lg:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 lg:space-y-6">
          <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 pb-2">
            <TabsNavigation />
          </div>

          <TabsContent value="dashboard" className="space-y-4 lg:space-y-6 mt-0">
            {/* Mobile-Optimized Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 lg:px-6">
                  <CardTitle className="text-xs lg:text-sm font-medium truncate">Pending</CardTitle>
                  <AlertCircle className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-600 flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 lg:px-6">
                  <div className="text-lg lg:text-2xl font-bold text-yellow-600">{stats.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground hidden sm:block">Require attention</p>
                </CardContent>
              </Card>

              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 lg:px-6">
                  <CardTitle className="text-xs lg:text-sm font-medium truncate">Active</CardTitle>
                  <ShoppingCart className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600 flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 lg:px-6">
                  <div className="text-lg lg:text-2xl font-bold text-blue-600">{stats.activeOrders}</div>
                  <p className="text-xs text-muted-foreground hidden sm:block">In progress</p>
                </CardContent>
              </Card>

              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 lg:px-6">
                  <CardTitle className="text-xs lg:text-sm font-medium truncate">Today</CardTitle>
                  <Calendar className="h-3 w-3 lg:h-4 lg:w-4 text-green-600 flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 lg:px-6">
                  <div className="text-lg lg:text-2xl font-bold text-green-600">{stats.completedToday}</div>
                  <p className="text-xs text-muted-foreground hidden sm:block">Completed</p>
                </CardContent>
              </Card>

              <Card className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 lg:px-6">
                  <CardTitle className="text-xs lg:text-sm font-medium truncate">Value</CardTitle>
                  <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 text-purple-600 flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 lg:px-6">
                  <div className="text-sm lg:text-2xl font-bold text-purple-600">₱{stats.totalValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground hidden sm:block">Active value</p>
                </CardContent>
              </Card>
            </div>

            {/* Mobile-Optimized Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              <Card>
                <CardHeader className="px-4 lg:px-6">
                  <CardTitle className="text-base lg:text-lg">Recent Activities</CardTitle>
                  <CardDescription className="text-sm">Latest procurement activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 px-4 lg:px-6">
                  {processes.slice(0, 3).map((process) => (
                    <div key={process.id} className="flex items-center justify-between p-3 lg:p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="flex-shrink-0">
                          {getTypeIcon(process.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{process.title}</p>
                          <p className="text-xs text-gray-500 truncate">{process.description}</p>
                          <div className="flex items-center space-x-2 mt-1 flex-wrap">
                            <Badge className={`${getStatusColor(process.status)} text-xs`} variant="secondary">
                              {process.status}
                            </Badge>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(process.priority)}`} />
                            <span className="text-xs text-gray-500 hidden sm:inline">Due: {process.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-2 flex-shrink-0">View</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Process Flow - Simplified for Mobile */}
              <Card>
                <CardHeader className="px-4 lg:px-6">
                  <CardTitle className="text-base lg:text-lg">Process Flow</CardTitle>
                  <CardDescription className="text-sm">Workflow status</CardDescription>
                </CardHeader>
                <CardContent className="px-4 lg:px-6">
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium truncate">MRF Creation</span>
                      </div>
                      <Badge variant="secondary" className="text-xs flex-shrink-0">2 Pending</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-600" />
                        </div>
                        <span className="text-sm font-medium truncate">Quotations</span>
                      </div>
                      <Badge variant="secondary" className="text-xs flex-shrink-0">1 Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <ShoppingCart className="h-3 w-3 lg:h-4 lg:w-4 text-green-600" />
                        </div>
                        <span className="text-sm font-medium truncate">Purchase Orders</span>
                      </div>
                      <Badge variant="secondary" className="text-xs flex-shrink-0">3 Processing</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <Truck className="h-3 w-3 lg:h-4 lg:w-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium truncate">Delivery</span>
                      </div>
                      <Badge variant="secondary" className="text-xs flex-shrink-0">2 Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile-Optimized Quick Actions */}
            <Card>
              <CardHeader className="px-4 lg:px-6">
                <CardTitle className="text-base lg:text-lg">Quick Actions</CardTitle>
                <CardDescription className="text-sm">Start new processes</CardDescription>
              </CardHeader>
              <CardContent className="px-4 lg:px-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2 lg:gap-3">
                  <Button onClick={() => setActiveTab("mrf")} className="flex items-center justify-center space-x-1 lg:space-x-2 text-xs lg:text-sm">
                    <Plus className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>New MRF</span>
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("quotations")} className="flex items-center justify-center space-x-1 lg:space-x-2 text-xs lg:text-sm">
                    <DollarSign className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Quote</span>
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("purchase-orders")} className="flex items-center justify-center space-x-1 lg:space-x-2 text-xs lg:text-sm">
                    <ShoppingCart className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>PO</span>
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("suppliers")} className="flex items-center justify-center space-x-1 lg:space-x-2 text-xs lg:text-sm">
                    <Search className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Suppliers</span>
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("inventory")} className="flex items-center justify-center space-x-1 lg:space-x-2 text-xs lg:text-sm">
                    <Package className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Inventory</span>
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("email")} className="flex items-center justify-center space-x-1 lg:space-x-2 text-xs lg:text-sm">
                    <Mail className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>Email</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mrf">
            <MRFForm />
          </TabsContent>

          <TabsContent value="quotations">
            <QuotationManager />
          </TabsContent>

          <TabsContent value="purchase-orders">
            <PurchaseOrderManager />
          </TabsContent>

          <TabsContent value="suppliers">
            <SupplierSourcing />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManager />
          </TabsContent>

          <TabsContent value="email">
            <EmailTemplates />
          </TabsContent>

          <TabsContent value="enterprise">
            <EnterpriseIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
