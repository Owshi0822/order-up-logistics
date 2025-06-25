
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, FileText, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MRFItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  purpose: string;
}

const MRFForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    mrfNumber: `MRF-${Date.now()}`,
    pic: '',
    department: '',
    project: '',
    requestDate: new Date().toISOString().split('T')[0],
    requiredDate: '',
    justification: ''
  });

  const [items, setItems] = useState<MRFItem[]>([
    {
      id: '1',
      description: '',
      quantity: 1,
      unit: 'pcs',
      urgency: 'medium',
      purpose: ''
    }
  ]);

  const addItem = () => {
    const newItem: MRFItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unit: 'pcs',
      urgency: 'medium',
      purpose: ''
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof MRFItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.pic || !formData.department || !formData.requiredDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (items.some(item => !item.description || !item.purpose)) {
      toast({
        title: "Incomplete Items",
        description: "Please complete all item descriptions and purposes.",
        variant: "destructive",
      });
      return;
    }

    console.log('MRF Data:', { formData, items });
    
    toast({
      title: "MRF Submitted Successfully",
      description: `MRF ${formData.mrfNumber} has been submitted for TM approval.`,
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Material Request Form (MRF)</h2>
          <p className="text-muted-foreground">Create a new material request for approval by TM and PM</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <FileText className="h-3 w-3 mr-1" />
          {formData.mrfNumber}
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Request Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Request Information</span>
            </CardTitle>
            <CardDescription>Basic information about the material request</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pic">Person in Charge (PIC) *</Label>
              <Input
                id="pic"
                value={formData.pic}
                onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                placeholder="Enter PIC name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                  <SelectItem value="it">IT Department</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project/Site</Label>
              <Input
                id="project"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                placeholder="Enter project or site name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requiredDate">Required Date *</Label>
              <Input
                id="requiredDate"
                type="date"
                value={formData.requiredDate}
                onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="justification">Justification</Label>
              <Textarea
                id="justification"
                value={formData.justification}
                onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                placeholder="Explain why these materials are needed..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Requested Items</span>
              <Button type="button" onClick={addItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardTitle>
            <CardDescription>List all materials and supplies needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label>Item Description *</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Describe the item needed"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Urgency Level</Label>
                    <Select
                      value={item.urgency}
                      onValueChange={(value) => updateItem(item.id, 'urgency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quantity *</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Unit</Label>
                    <Select
                      value={item.unit}
                      onValueChange={(value) => updateItem(item.id, 'unit', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">Pieces</SelectItem>
                        <SelectItem value="boxes">Boxes</SelectItem>
                        <SelectItem value="meters">Meters</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="liters">Liters</SelectItem>
                        <SelectItem value="sets">Sets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Current Status</Label>
                    <Badge className={getUrgencyColor(item.urgency)} variant="secondary">
                      {item.urgency}
                    </Badge>
                  </div>

                  <div className="space-y-2 md:col-span-3">
                    <Label>Purpose/Usage *</Label>
                    <Textarea
                      value={item.purpose}
                      onChange={(e) => updateItem(item.id, 'purpose', e.target.value)}
                      placeholder="Explain how this item will be used"
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Approval Workflow Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Approval Workflow</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">1</div>
                <span><strong>TM Approval:</strong> Team Manager review and approval</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium">2</div>
                <span><strong>PM Approval:</strong> Project Manager final approval</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium">3</div>
                <span><strong>Procurement:</strong> Quotation request and purchase order creation</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline">Save Draft</Button>
          <Button type="submit">Submit for Approval</Button>
        </div>
      </form>
    </div>
  );
};

export default MRFForm;
