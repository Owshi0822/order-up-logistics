
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, DollarSign, User, Clock, CheckCircle, AlertTriangle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseOrder {
  id: string;
  quotationId: string;
  supplierName: string;
  totalAmount: number;
  status: 'draft' | 'pending-approval' | 'approved' | 'sent' | 'acknowledged';
  paymentTerms: 'PDC' | 'Fund Transfer' | 'Terms';
  signatory: string;
  createdDate: string;
  approvalDate?: string;
  sentDate?: string;
  expectedDelivery?: string;
}

const PurchaseOrderManager = () => {
  const { toast } = useToast();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    {
      id: 'PO-001',
      quotationId: 'QUO-001',
      supplierName: 'ABC Supplies Co.',
      totalAmount: 15750,
      status: 'pending-approval',
      paymentTerms: 'PDC',
      signatory: 'Project Support Officer',
      createdDate: '2024-01-15',
      expectedDelivery: '2024-01-25'
    },
    {
      id: 'PO-002',
      quotationId: 'QUO-002',
      supplierName: 'Steel Works Inc.',
      totalAmount: 89500,
      status: 'pending-approval',
      paymentTerms: 'Fund Transfer',
      signatory: 'Finance Manager & Managing Director',
      createdDate: '2024-01-16',
      expectedDelivery: '2024-02-01'
    }
  ]);

  const [newPO, setNewPO] = useState({
    quotationId: '',
    supplierName: '',
    totalAmount: 0,
    paymentTerms: 'PDC' as const,
    expectedDelivery: ''
  });

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const getSignatory = (amount: number) => {
    return amount < 20000 ? 'Project Support Officer' : 'Finance Manager & Managing Director';
  };

  const getApprovalTime = (amount: number) => {
    return amount < 20000 ? 'Same day' : '1-2 days';
  };

  const handleCreatePO = () => {
    if (!newPO.supplierName || !newPO.totalAmount || !newPO.expectedDelivery) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const purchaseOrder: PurchaseOrder = {
      id: `PO-${Date.now()}`,
      quotationId: newPO.quotationId || `QUO-${Date.now()}`,
      supplierName: newPO.supplierName,
      totalAmount: newPO.totalAmount,
      status: 'pending-approval',
      paymentTerms: newPO.paymentTerms,
      signatory: getSignatory(newPO.totalAmount),
      createdDate: new Date().toISOString().split('T')[0],
      expectedDelivery: newPO.expectedDelivery
    };

    setPurchaseOrders([...purchaseOrders, purchaseOrder]);
    setShowCreateDialog(false);
    setNewPO({
      quotationId: '',
      supplierName: '',
      totalAmount: 0,
      paymentTerms: 'PDC',
      expectedDelivery: ''
    });

    toast({
      title: "Purchase Order Created",
      description: `PO ${purchaseOrder.id} created and sent for approval to ${purchaseOrder.signatory}.`,
    });
  };

  const handleSendPO = (poId: string) => {
    setPurchaseOrders(orders => 
      orders.map(po => 
        po.id === poId 
          ? { ...po, status: 'sent' as const, sentDate: new Date().toISOString().split('T')[0] }
          : po
      )
    );

    toast({
      title: "Purchase Order Sent",
      description: `PO ${poId} has been sent to the supplier.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending-approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'acknowledged': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <ShoppingCart className="h-4 w-4" />;
      case 'pending-approval': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'acknowledged': return <CheckCircle className="h-4 w-4" />;
      default: return <ShoppingCart className="h-4 w-4" />;
    }
  };

  const getPaymentTermsColor = (terms: string) => {
    switch (terms) {
      case 'PDC': return 'bg-blue-100 text-blue-800';
      case 'Fund Transfer': return 'bg-green-100 text-green-800';
      case 'Terms': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Purchase Order Management</h2>
          <p className="text-muted-foreground">Create and manage purchase orders with automatic approval routing</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Create Purchase Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Purchase Order</DialogTitle>
              <DialogDescription>
                Generate a purchase order from approved quotation
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplierName">Supplier Name *</Label>
                  <Input
                    id="supplierName"
                    value={newPO.supplierName}
                    onChange={(e) => setNewPO({ ...newPO, supplierName: e.target.value })}
                    placeholder="Enter supplier name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Total Amount (₱) *</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    value={newPO.totalAmount}
                    onChange={(e) => setNewPO({ ...newPO, totalAmount: parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select 
                    value={newPO.paymentTerms} 
                    onValueChange={(value: 'PDC' | 'Fund Transfer' | 'Terms') => 
                      setNewPO({ ...newPO, paymentTerms: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDC">PDC (Post-dated Check)</SelectItem>
                      <SelectItem value="Fund Transfer">Fund Transfer</SelectItem>
                      <SelectItem value="Terms">Terms (Credit)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedDelivery">Expected Delivery Date *</Label>
                  <Input
                    id="expectedDelivery"
                    type="date"
                    value={newPO.expectedDelivery}
                    onChange={(e) => setNewPO({ ...newPO, expectedDelivery: e.target.value })}
                  />
                </div>
              </div>

              {newPO.totalAmount > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Approval Requirements</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>Signatory:</strong> {getSignatory(newPO.totalAmount)}</p>
                    <p><strong>Approval Time:</strong> {getApprovalTime(newPO.totalAmount)}</p>
                    {newPO.totalAmount >= 20000 && (
                      <div className="flex items-center space-x-2 mt-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span className="text-amber-800">Requires dual approval (Finance Manager & Managing Director)</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePO}>
                  Create Purchase Order
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="sent">Sent to Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {purchaseOrders.filter(po => po.status === 'pending-approval').map((po) => (
              <Card key={po.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{po.id}</span>
                        <Badge className={getStatusColor(po.status)} variant="secondary">
                          {getStatusIcon(po.status)}
                          <span className="ml-1">{po.status.replace('-', ' ')}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {po.supplierName} • Expected Delivery: {po.expectedDelivery}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">₱{po.totalAmount.toLocaleString()}</p>
                      <Badge className={getPaymentTermsColor(po.paymentTerms)} variant="outline">
                        {po.paymentTerms}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">Awaiting approval from:</span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">{po.signatory}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Created: {po.createdDate}</span>
                      <span>Approval Time: {getApprovalTime(po.totalAmount)}</span>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Send Reminder</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4">
            {purchaseOrders.filter(po => po.status === 'approved').map((po) => (
              <Card key={po.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{po.id}</span>
                        <Badge className={getStatusColor(po.status)} variant="secondary">
                          {getStatusIcon(po.status)}
                          <span className="ml-1">{po.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {po.supplierName} • Ready to send
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">₱{po.totalAmount.toLocaleString()}</p>
                      <Badge className={getPaymentTermsColor(po.paymentTerms)} variant="outline">
                        {po.paymentTerms}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Approved: {po.approvalDate || 'Today'}
                    </span>
                    <Button onClick={() => handleSendPO(po.id)}>
                      <Send className="h-4 w-4 mr-2" />
                      Send to Supplier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <div className="grid gap-4">
            {purchaseOrders.filter(po => po.status === 'sent' || po.status === 'acknowledged').map((po) => (
              <Card key={po.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{po.id}</span>
                        <Badge className={getStatusColor(po.status)} variant="secondary">
                          {getStatusIcon(po.status)}
                          <span className="ml-1">{po.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {po.supplierName} • Payment: {po.paymentTerms}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">₱{po.totalAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Sent: {po.sentDate}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Next Steps:</p>
                      <p className="text-sm text-blue-800">
                        {po.paymentTerms === 'PDC' && 'Request advance invoice copy for check preparation (2-3 days)'}
                        {po.paymentTerms === 'Fund Transfer' && 'Request bank details for payment processing (1-2 days)'}
                        {po.paymentTerms === 'Terms' && 'Coordinate delivery schedule with supplier'}
                      </p>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Contact Supplier</Button>
                      <Button variant="outline" size="sm">Track Payment</Button>
                      <Button size="sm">Schedule Delivery</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurchaseOrderManager;
