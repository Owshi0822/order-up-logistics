
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, Mail, FileText, Plus, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Quotation {
  id: string;
  mrfId: string;
  supplierName: string;
  supplierEmail: string;
  items: string[];
  totalAmount: number;
  validUntil: string;
  status: 'pending' | 'received' | 'approved' | 'rejected';
  requestDate: string;
  responseDate?: string;
}

const QuotationManager = () => {
  const { toast } = useToast();
  const [quotations, setQuotations] = useState<Quotation[]>([
    {
      id: 'QUO-001',
      mrfId: 'MRF-001',
      supplierName: 'ABC Supplies Co.',
      supplierEmail: 'quotes@abcsupplies.com',
      items: ['Office Supplies', 'Printer Paper', 'Stationery'],
      totalAmount: 15750,
      validUntil: '2024-02-15',
      status: 'received',
      requestDate: '2024-01-10',
      responseDate: '2024-01-12'
    },
    {
      id: 'QUO-002',
      mrfId: 'MRF-002',
      supplierName: 'Steel Works Inc.',
      supplierEmail: 'sales@steelworks.com',
      items: ['Steel Pipes', 'Fittings', 'Welding Materials'],
      totalAmount: 89500,
      validUntil: '2024-02-20',
      status: 'pending',
      requestDate: '2024-01-15'
    }
  ]);

  const [emailForm, setEmailForm] = useState({
    supplier: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const handleSendQuotationRequest = () => {
    if (!emailForm.supplier || !emailForm.email || !emailForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log('Sending quotation request:', emailForm);
    
    const newQuotation: Quotation = {
      id: `QUO-${Date.now()}`,
      mrfId: 'MRF-003',
      supplierName: emailForm.supplier,
      supplierEmail: emailForm.email,
      items: ['New Items'],
      totalAmount: 0,
      validUntil: '',
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0]
    };

    setQuotations([...quotations, newQuotation]);
    setShowEmailDialog(false);
    setEmailForm({ supplier: '', email: '', subject: '', message: '' });

    toast({
      title: "Quotation Request Sent",
      description: `Request sent to ${emailForm.supplier}. They will receive the email shortly.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'received': return <Mail className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <DollarSign className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quotation Management</h2>
          <p className="text-muted-foreground">Request and manage supplier quotations</p>
        </div>
        <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Request Quotation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send Quotation Request</DialogTitle>
              <DialogDescription>
                Send an email to suppliers requesting quotations for approved MRF items
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier Name *</Label>
                  <Input
                    id="supplier"
                    value={emailForm.supplier}
                    onChange={(e) => setEmailForm({ ...emailForm, supplier: e.target.value })}
                    placeholder="Enter supplier company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    placeholder="supplier@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  placeholder="Quotation Request - [Project Name]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  placeholder="Dear Supplier,&#10;&#10;We would like to request a quotation for the following items:&#10;&#10;Please provide your best pricing and delivery timeline.&#10;&#10;Thank you."
                  rows={8}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendQuotationRequest}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Requests</TabsTrigger>
          <TabsTrigger value="received">Received Quotes</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {quotations.filter(q => q.status === 'pending').map((quotation) => (
              <Card key={quotation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{quotation.id}</span>
                        <Badge className={getStatusColor(quotation.status)} variant="secondary">
                          {getStatusIcon(quotation.status)}
                          <span className="ml-1">{quotation.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {quotation.supplierName} • {quotation.supplierEmail}
                      </CardDescription>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>Requested: {quotation.requestDate}</p>
                      <p>MRF: {quotation.mrfId}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Items Requested:</p>
                      <div className="flex flex-wrap gap-2">
                        {quotation.items.map((item, index) => (
                          <Badge key={index} variant="outline">{item}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-muted-foreground">Waiting for supplier response</span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Follow Up
                        </Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="received" className="space-y-4">
          <div className="grid gap-4">
            {quotations.filter(q => q.status === 'received').map((quotation) => (
              <Card key={quotation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{quotation.id}</span>
                        <Badge className={getStatusColor(quotation.status)} variant="secondary">
                          {getStatusIcon(quotation.status)}
                          <span className="ml-1">{quotation.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {quotation.supplierName} • {quotation.supplierEmail}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">₱{quotation.totalAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Valid until: {quotation.validUntil}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Items Quoted:</p>
                      <div className="flex flex-wrap gap-2">
                        {quotation.items.map((item, index) => (
                          <Badge key={index} variant="outline">{item}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-muted-foreground">
                        Received: {quotation.responseDate}
                      </span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Compare Quotes</Button>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4">
            {quotations.filter(q => q.status === 'approved').map((quotation) => (
              <Card key={quotation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{quotation.id}</span>
                        <Badge className={getStatusColor(quotation.status)} variant="secondary">
                          {getStatusIcon(quotation.status)}
                          <span className="ml-1">{quotation.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {quotation.supplierName} • Ready for Purchase Order
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">₱{quotation.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end">
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Create Purchase Order
                    </Button>
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

export default QuotationManager;
