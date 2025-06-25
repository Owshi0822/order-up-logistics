
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Truck, MapPin, Calendar, Clock, CheckCircle, Package, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Delivery {
  id: string;
  poId: string;
  supplierName: string;
  items: string[];
  deliveryType: 'office' | 'site' | 'direct-to-site';
  status: 'scheduled' | 'in-transit' | 'delivered' | 'pending-coordination';
  scheduledDate: string;
  deliveredDate?: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  deliveryMethod: 'supplier' | 'lalamove' | 'company-vehicle';
  trackingNumber?: string;
  notes?: string;
}

const DeliveryCoordinator = () => {
  const { toast } = useToast();
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 'DEL-001',
      poId: 'PO-001',
      supplierName: 'ABC Supplies Co.',
      items: ['Office Supplies', 'Printer Paper', 'Stationery'],
      deliveryType: 'office',
      status: 'scheduled',
      scheduledDate: '2024-01-25',
      address: 'Main Office, 123 Business Street, Makati City',
      contactPerson: 'John Doe',
      contactNumber: '+63-917-123-4567',
      deliveryMethod: 'supplier'
    },
    {
      id: 'DEL-002',
      poId: 'PO-002',
      supplierName: 'Steel Works Inc.',
      items: ['Steel Pipes', 'Fittings', 'Welding Materials'],
      deliveryType: 'site',
      status: 'pending-coordination',
      scheduledDate: '2024-02-01',
      address: 'Construction Site A, Quezon City',
      contactPerson: 'Site Foreman',
      contactNumber: '+63-917-987-6543',
      deliveryMethod: 'lalamove'
    }
  ]);

  const [newDelivery, setNewDelivery] = useState({
    poId: '',
    supplierName: '',
    deliveryType: 'office' as const,
    scheduledDate: '',
    address: '',
    contactPerson: '',
    contactNumber: '',
    deliveryMethod: 'supplier' as const,
    notes: ''
  });

  const [showCoordinateDialog, setShowCoordinateDialog] = useState(false);

  const handleScheduleDelivery = () => {
    if (!newDelivery.poId || !newDelivery.scheduledDate || !newDelivery.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const delivery: Delivery = {
      id: `DEL-${Date.now()}`,
      poId: newDelivery.poId,
      supplierName: newDelivery.supplierName,
      items: ['New Items'],
      deliveryType: newDelivery.deliveryType,
      status: 'scheduled',
      scheduledDate: newDelivery.scheduledDate,
      address: newDelivery.address,
      contactPerson: newDelivery.contactPerson,
      contactNumber: newDelivery.contactNumber,
      deliveryMethod: newDelivery.deliveryMethod,
      notes: newDelivery.notes
    };

    setDeliveries([...deliveries, delivery]);
    setShowCoordinateDialog(false);
    setNewDelivery({
      poId: '',
      supplierName: '',
      deliveryType: 'office',
      scheduledDate: '',
      address: '',
      contactPerson: '',
      contactNumber: '',
      deliveryMethod: 'supplier',
      notes: ''
    });

    toast({
      title: "Delivery Scheduled",
      description: `Delivery ${delivery.id} has been scheduled for ${delivery.scheduledDate}.`,
    });
  };

  const updateDeliveryStatus = (deliveryId: string, newStatus: Delivery['status']) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === deliveryId 
        ? { 
            ...delivery, 
            status: newStatus,
            ...(newStatus === 'delivered' ? { deliveredDate: new Date().toISOString().split('T')[0] } : {})
          }
        : delivery
    ));

    toast({
      title: "Status Updated",
      description: `Delivery ${deliveryId} status updated to ${newStatus}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending-coordination': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-transit': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending-coordination': return <Clock className="h-4 w-4" />;
      case 'scheduled': return <Calendar className="h-4 w-4" />;
      case 'in-transit': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getDeliveryTypeColor = (type: string) => {
    switch (type) {
      case 'office': return 'bg-blue-100 text-blue-800';
      case 'site': return 'bg-green-100 text-green-800';
      case 'direct-to-site': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeliveryMethodIcon = (method: string) => {
    switch (method) {
      case 'supplier': return <Truck className="h-4 w-4" />;
      case 'lalamove': return <MapPin className="h-4 w-4" />;
      case 'company-vehicle': return <Truck className="h-4 w-4" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Delivery Coordination</h2>
          <p className="text-muted-foreground">Coordinate and track deliveries from suppliers to office and sites</p>
        </div>
        <Dialog open={showCoordinateDialog} onOpenChange={setShowCoordinateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Truck className="h-4 w-4 mr-2" />
              Schedule Delivery
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Delivery</DialogTitle>
              <DialogDescription>
                Coordinate delivery from supplier to office or construction site
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="poId">Purchase Order ID *</Label>
                  <Input
                    id="poId"
                    value={newDelivery.poId}
                    onChange={(e) => setNewDelivery({ ...newDelivery, poId: e.target.value })}
                    placeholder="PO-001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplierName">Supplier Name</Label>
                  <Input
                    id="supplierName"
                    value={newDelivery.supplierName}
                    onChange={(e) => setNewDelivery({ ...newDelivery, supplierName: e.target.value })}
                    placeholder="Enter supplier name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveryType">Delivery Destination</Label>
                  <Select 
                    value={newDelivery.deliveryType} 
                    onValueChange={(value: 'office' | 'site' | 'direct-to-site') => 
                      setNewDelivery({ ...newDelivery, deliveryType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Main Office</SelectItem>
                      <SelectItem value="site">Construction Site (via Lalamove)</SelectItem>
                      <SelectItem value="direct-to-site">Direct to Site (Large Items)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryMethod">Delivery Method</Label>
                  <Select 
                    value={newDelivery.deliveryMethod} 
                    onValueChange={(value: 'supplier' | 'lalamove' | 'company-vehicle') => 
                      setNewDelivery({ ...newDelivery, deliveryMethod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplier">Supplier Delivery</SelectItem>
                      <SelectItem value="lalamove">Lalamove</SelectItem>
                      <SelectItem value="company-vehicle">Company Vehicle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Scheduled Delivery Date *</Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={newDelivery.scheduledDate}
                  onChange={(e) => setNewDelivery({ ...newDelivery, scheduledDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address *</Label>
                <Textarea
                  id="address"
                  value={newDelivery.address}
                  onChange={(e) => setNewDelivery({ ...newDelivery, address: e.target.value })}
                  placeholder="Enter complete delivery address"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={newDelivery.contactPerson}
                    onChange={(e) => setNewDelivery({ ...newDelivery, contactPerson: e.target.value })}
                    placeholder="Recipient name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={newDelivery.contactNumber}
                    onChange={(e) => setNewDelivery({ ...newDelivery, contactNumber: e.target.value })}
                    placeholder="+63-917-XXX-XXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Instructions</Label>
                <Textarea
                  id="notes"
                  value={newDelivery.notes}
                  onChange={(e) => setNewDelivery({ ...newDelivery, notes: e.target.value })}
                  placeholder="Any special delivery instructions..."
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowCoordinateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleScheduleDelivery}>
                  Schedule Delivery
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="scheduled" className="space-y-6">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-transit">In Transit</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="pending">Pending Coordination</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid gap-4">
            {deliveries.filter(d => d.status === 'scheduled').map((delivery) => (
              <Card key={delivery.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{delivery.id}</span>
                        <Badge className={getStatusColor(delivery.status)} variant="secondary">
                          {getStatusIcon(delivery.status)}
                          <span className="ml-1">{delivery.status}</span>
                        </Badge>
                        <Badge className={getDeliveryTypeColor(delivery.deliveryType)} variant="outline">
                          {delivery.deliveryType}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {delivery.supplierName} • PO: {delivery.poId}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">📅 {delivery.scheduledDate}</p>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        {getDeliveryMethodIcon(delivery.deliveryMethod)}
                        <span>{delivery.deliveryMethod}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Delivery Address</p>
                          <p className="text-sm text-muted-foreground">{delivery.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <User className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Contact Information</p>
                          <p className="text-sm text-muted-foreground">
                            {delivery.contactPerson} • {delivery.contactNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Items to Deliver:</p>
                      <div className="flex flex-wrap gap-2">
                        {delivery.items.map((item, index) => (
                          <Badge key={index} variant="outline">{item}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-3 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateDeliveryStatus(delivery.id, 'in-transit')}
                      >
                        Mark In Transit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Supplier
                      </Button>
                      <Button size="sm">Update Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-transit" className="space-y-4">
          <div className="grid gap-4">
            {deliveries.filter(d => d.status === 'in-transit').map((delivery) => (
              <Card key={delivery.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{delivery.id}</span>
                        <Badge className={getStatusColor(delivery.status)} variant="secondary">
                          {getStatusIcon(delivery.status)}
                          <span className="ml-1">{delivery.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {delivery.supplierName} • Expected: {delivery.scheduledDate}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      {delivery.trackingNumber && (
                        <p className="text-sm text-blue-600 font-mono">{delivery.trackingNumber}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateDeliveryStatus(delivery.id, 'delivered')}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Delivered
                    </Button>
                    <Button variant="outline" size="sm">Track Shipment</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          <div className="grid gap-4">
            {deliveries.filter(d => d.status === 'delivered').map((delivery) => (
              <Card key={delivery.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{delivery.id}</span>
                        <Badge className={getStatusColor(delivery.status)} variant="secondary">
                          {getStatusIcon(delivery.status)}
                          <span className="ml-1">{delivery.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {delivery.supplierName} • Delivered: {delivery.deliveredDate}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">View Receipt</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {deliveries.filter(d => d.status === 'pending-coordination').map((delivery) => (
              <Card key={delivery.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{delivery.id}</span>
                        <Badge className={getStatusColor(delivery.status)} variant="secondary">
                          {getStatusIcon(delivery.status)}
                          <span className="ml-1">pending coordination</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {delivery.supplierName} • Needs delivery setup
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateDeliveryStatus(delivery.id, 'scheduled')}
                    >
                      Schedule Delivery
                    </Button>
                    <Button size="sm">Contact PIC</Button>
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

export default DeliveryCoordinator;
