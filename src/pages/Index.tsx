
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, ShoppingCart, Truck, Mail, Calendar, DollarSign, User, AlertCircle } from "lucide-react";
import MRFForm from "@/components/MRFForm";
import QuotationManager from "@/components/QuotationManager";
import PurchaseOrderManager from "@/components/PurchaseOrderManager";
import DeliveryCoordinator from "@/components/DeliveryCoordinator";
import { useToast } from "@/hooks/use-toast";

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
  const [activeTab, setActiveTab] = useState("dashboard");
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Procurement Management System</h1>
              <p className="text-gray-600 mt-1">Internal logistics and purchasing platform</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email Center
              </Button>
              <Badge variant="secondary" className="px-3 py-1">
                <User className="h-3 w-3 mr-1" />
                Procurement Officer
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="mrf">Material Request</TabsTrigger>
            <TabsTrigger value="quotations">Quotations</TabsTrigger>
            <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">Require immediate attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.activeOrders}</div>
                  <p className="text-xs text-muted-foreground">Currently in progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                  <Calendar className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
                  <p className="text-xs text-muted-foreground">Successfully processed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">₱{stats.totalValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Active procurement value</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest procurement activities requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {processes.slice(0, 3).map((process) => (
                    <div key={process.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {getTypeIcon(process.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{process.title}</p>
                          <p className="text-xs text-gray-500">{process.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(process.status)} variant="secondary">
                              {process.status}
                            </Badge>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(process.priority)}`} />
                            <span className="text-xs text-gray-500">Due: {process.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Procurement Process Flow</CardTitle>
                  <CardDescription>Current workflow status overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">MRF Creation & Approval</span>
                      </div>
                      <Badge variant="secondary">2 Pending</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-yellow-600" />
                        </div>
                        <span className="text-sm font-medium">Quotation Request</span>
                      </div>
                      <Badge variant="secondary">1 Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <ShoppingCart className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm font-medium">Purchase Orders</span>
                      </div>
                      <Badge variant="secondary">3 Processing</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Truck className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium">Delivery Coordination</span>
                      </div>
                      <Badge variant="secondary">2 Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Start new procurement processes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setActiveTab("mrf")} className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>New MRF</span>
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("quotations")}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Request Quotation
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("purchase-orders")}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Create Purchase Order
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email to Supplier
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

          <TabsContent value="delivery">
            <DeliveryCoordinator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
