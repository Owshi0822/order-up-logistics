
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Star, Phone, Mail, MapPin, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  specialties: string[];
  paymentTerms: string[];
  leadTime: string;
  verified: boolean;
}

interface SupplierItem {
  id: string;
  supplierId: string;
  itemName: string;
  brand: string;
  price: number;
  currency: string;
  minQuantity: number;
  leadTime: string;
  paymentTerms: string;
  specifications: string;
  lastUpdated: string;
}

const SupplierSourcing = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  
  const [suppliers] = useState<Supplier[]>([
    {
      id: 'SUP-001',
      name: 'ABC Construction Supplies',
      email: 'sales@abcsupplies.com',
      phone: '+63 2 8123 4567',
      address: '123 Industrial Ave, Makati City',
      rating: 4.5,
      specialties: ['Construction Materials', 'Hardware', 'Tools'],
      paymentTerms: ['30 Days', 'PDC', 'Terms'],
      leadTime: '3-5 days',
      verified: true
    },
    {
      id: 'SUP-002',
      name: 'Premium Steel Works Inc.',
      email: 'orders@steelworks.com',
      phone: '+63 2 8987 6543',
      address: '456 Steel Road, Quezon City',
      rating: 4.8,
      specialties: ['Steel Products', 'Metal Fabrication', 'Pipes'],
      paymentTerms: ['Fund Transfer', 'PDC'],
      leadTime: '5-7 days',
      verified: true
    },
    {
      id: 'SUP-003',
      name: 'Office Solutions Hub',
      email: 'info@officesolutions.com',
      phone: '+63 2 8456 7890',
      address: '789 Business Park, BGC',
      rating: 4.2,
      specialties: ['Office Supplies', 'Furniture', 'Technology'],
      paymentTerms: ['Terms', '15 Days'],
      leadTime: '1-3 days',
      verified: false
    }
  ]);

  const [supplierItems] = useState<SupplierItem[]>([
    {
      id: 'ITEM-001',
      supplierId: 'SUP-001',
      itemName: 'Steel Pipe 4 inches',
      brand: 'PhilSteel',
      price: 1250,
      currency: 'PHP',
      minQuantity: 10,
      leadTime: '3-5 days',
      paymentTerms: '30 Days',
      specifications: 'Galvanized steel pipe, 4 inch diameter, 6 meter length',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'ITEM-002',
      supplierId: 'SUP-002',
      itemName: 'Steel Pipe 4 inches',
      brand: 'PhilSteel',
      price: 1180,
      currency: 'PHP',
      minQuantity: 20,
      leadTime: '5-7 days',
      paymentTerms: 'Fund Transfer',
      specifications: 'Galvanized steel pipe, 4 inch diameter, 6 meter length',
      lastUpdated: '2024-01-16'
    },
    {
      id: 'ITEM-003',
      supplierId: 'SUP-003',
      itemName: 'Office Chair Executive',
      brand: 'ErgoMax',
      price: 8500,
      currency: 'PHP',
      minQuantity: 1,
      leadTime: '1-3 days',
      paymentTerms: 'Terms',
      specifications: 'Ergonomic office chair with lumbar support, leather finish',
      lastUpdated: '2024-01-14'
    }
  ]);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getSupplierName = (supplierId: string) => {
    return suppliers.find(s => s.id === supplierId)?.name || 'Unknown Supplier';
  };

  const getItemComparisons = (itemName: string) => {
    return supplierItems.filter(item => 
      item.itemName.toLowerCase().includes(itemName.toLowerCase())
    );
  };

  const handleContactSupplier = (supplier: Supplier) => {
    toast({
      title: "Contact Supplier",
      description: `Opening email client to contact ${supplier.name}`,
    });
    // In a real app, this would open the email client or contact form
    window.location.href = `mailto:${supplier.email}?subject=Inquiry from Procurement System`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Supplier Sourcing</h2>
          <p className="text-muted-foreground">Find and compare suppliers for your procurement needs</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Supplier
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers or specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="suppliers">All Suppliers</TabsTrigger>
          <TabsTrigger value="comparison">Price Comparison</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid gap-4">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{supplier.name}</span>
                          {supplier.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-2">
                          <span className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {supplier.rating}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {supplier.leadTime}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContactSupplier(supplier)}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{supplier.name}</DialogTitle>
                            <DialogDescription>
                              Complete supplier information and contact details
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-medium">Contact Information</Label>
                                <div className="space-y-1 text-sm">
                                  <p className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2" />
                                    {supplier.email}
                                  </p>
                                  <p className="flex items-center">
                                    <Phone className="h-4 w-4 mr-2" />
                                    {supplier.phone}
                                  </p>
                                  <p className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {supplier.address}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm font-medium">Business Details</Label>
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-sm font-medium">Specialties:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {supplier.specialties.map((specialty, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {specialty}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Payment Terms:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {supplier.paymentTerms.map((term, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {term}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {supplier.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline">{specialty}</Badge>
                    ))}
                    {supplier.specialties.length > 3 && (
                      <Badge variant="outline">+{supplier.specialties.length - 3} more</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Payment: {supplier.paymentTerms.join(', ')}</span>
                    <span>Lead Time: {supplier.leadTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Price Comparison - Steel Pipe 4 inches</CardTitle>
                <CardDescription>Compare prices from different suppliers for the same item</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getItemComparisons('Steel Pipe 4 inches').map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-medium">{getSupplierName(item.supplierId)}</p>
                            <p className="text-sm text-muted-foreground">
                              Brand: {item.brand} • Min Qty: {item.minQuantity}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₱{item.price.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.leadTime} • {item.paymentTerms}
                        </p>
                      </div>
                      <div className="ml-4">
                        <Button size="sm">Select</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{supplier.name}</span>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{supplier.rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">95%</p>
                      <p className="text-sm text-muted-foreground">On-time Delivery</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-sm text-muted-foreground">Active Orders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">₱2.1M</p>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
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

export default SupplierSourcing;
