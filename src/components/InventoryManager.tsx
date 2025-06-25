
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Search, Plus, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  unit: string;
  unitCost: number;
  location: string;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface MRFItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
}

const InventoryManager = () => {
  const { toast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'A4 Copy Paper',
      category: 'Office Supplies',
      currentStock: 50,
      minimumStock: 20,
      unit: 'reams',
      unitCost: 5.50,
      location: 'Storage Room A',
      lastUpdated: '2024-01-20',
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Blue Ballpoint Pens',
      category: 'Office Supplies',
      currentStock: 5,
      minimumStock: 25,
      unit: 'boxes',
      unitCost: 12.00,
      location: 'Supply Cabinet',
      lastUpdated: '2024-01-19',
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'Steel Pipes (2 inch)',
      category: 'Construction',
      currentStock: 0,
      minimumStock: 10,
      unit: 'pieces',
      unitCost: 45.00,
      location: 'Warehouse B',
      lastUpdated: '2024-01-18',
      status: 'out-of-stock'
    }
  ]);

  const [mrfItems] = useState<MRFItem[]>([
    {
      id: '1',
      name: 'A4 Copy Paper',
      quantity: 10,
      unit: 'reams',
      description: 'For Q1 office needs',
      urgency: 'medium'
    },
    {
      id: '2',
      name: 'Blue Ballpoint Pens',
      quantity: 5,
      unit: 'boxes',
      description: 'Office supplies replenishment',
      urgency: 'high'
    },
    {
      id: '3',
      name: 'Steel Pipes (2 inch)',
      quantity: 15,
      unit: 'pieces',
      description: 'For Site A construction',
      urgency: 'urgent'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    currentStock: 0,
    minimumStock: 0,
    unit: '',
    unitCost: 0,
    location: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'out-of-stock': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return <CheckCircle className="h-4 w-4" />;
      case 'low-stock': return <AlertTriangle className="h-4 w-4" />;
      case 'out-of-stock': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const checkMRFAvailability = (mrfItem: MRFItem) => {
    const inventoryItem = inventory.find(item => 
      item.name.toLowerCase() === mrfItem.name.toLowerCase()
    );
    
    if (!inventoryItem) {
      return { available: false, reason: 'Item not in inventory', action: 'Add to inventory' };
    }
    
    if (inventoryItem.currentStock >= mrfItem.quantity) {
      return { available: true, reason: 'Sufficient stock available', action: 'Use from inventory' };
    } else if (inventoryItem.currentStock > 0) {
      return { 
        available: false, 
        reason: `Only ${inventoryItem.currentStock} ${inventoryItem.unit} available, need ${mrfItem.quantity}`, 
        action: 'Purchase additional quantity' 
      };
    } else {
      return { available: false, reason: 'Out of stock', action: 'Purchase full quantity' };
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    const status = newItem.currentStock <= 0 ? 'out-of-stock' : 
                  newItem.currentStock <= newItem.minimumStock ? 'low-stock' : 'in-stock';

    const item: InventoryItem = {
      id: Date.now().toString(),
      ...newItem,
      status,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setInventory([...inventory, item]);
    setNewItem({
      name: '',
      category: '',
      currentStock: 0,
      minimumStock: 0,
      unit: '',
      unitCost: 0,
      location: ''
    });

    toast({
      title: "Item Added",
      description: "New inventory item added successfully"
    });
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Inventory Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inventory" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
              <TabsTrigger value="mrf-check">MRF Stock Check</TabsTrigger>
              <TabsTrigger value="add-item">Add Item</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredInventory.map((item) => (
                  <Card key={item.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <Badge className={`${getStatusColor(item.status)} text-xs`} variant="secondary">
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(item.status)}
                            <span>{item.status.replace('-', ' ')}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Current Stock:</span>
                          <span className="font-medium">{item.currentStock} {item.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Minimum Stock:</span>
                          <span>{item.minimumStock} {item.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unit Cost:</span>
                          <span>₱{item.unitCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span>{item.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Updated:</span>
                          <span>{item.lastUpdated}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mrf-check" className="space-y-4">
              <h3 className="text-lg font-medium">MRF Stock Availability Check</h3>
              <div className="space-y-4">
                {mrfItems.map((mrfItem) => {
                  const availability = checkMRFAvailability(mrfItem);
                  return (
                    <Card key={mrfItem.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{mrfItem.name}</h4>
                          <Badge className={availability.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} variant="secondary">
                            {availability.available ? 'Available' : 'Not Available'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p><strong>Required:</strong> {mrfItem.quantity} {mrfItem.unit}</p>
                            <p><strong>Urgency:</strong> {mrfItem.urgency}</p>
                          </div>
                          <div>
                            <p><strong>Status:</strong> {availability.reason}</p>
                            <p><strong>Action:</strong> {availability.action}</p>
                          </div>
                          <div className="flex items-center">
                            {availability.available ? (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Use from Stock
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="border-red-500 text-red-600">
                                Create PO
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="add-item" className="space-y-4">
              <h3 className="text-lg font-medium">Add New Inventory Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    placeholder="Enter category"
                  />
                </div>
                <div>
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem({...newItem, currentStock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="minimumStock">Minimum Stock</Label>
                  <Input
                    id="minimumStock"
                    type="number"
                    value={newItem.minimumStock}
                    onChange={(e) => setNewItem({...newItem, minimumStock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                    placeholder="pcs, boxes, reams, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="unitCost">Unit Cost (₱)</Label>
                  <Input
                    id="unitCost"
                    type="number"
                    step="0.01"
                    value={newItem.unitCost}
                    onChange={(e) => setNewItem({...newItem, unitCost: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="location">Storage Location</Label>
                  <Input
                    id="location"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    placeholder="Warehouse, Storage room, etc."
                  />
                </div>
              </div>
              <Button onClick={handleAddItem} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManager;
