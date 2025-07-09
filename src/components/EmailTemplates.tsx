
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Send, Copy, FileText, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'quotation' | 'inquiry' | 'followup' | 'approval';
}

const EmailTemplates = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  const templates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Quotation Request',
      subject: 'Request for Quotation - [PROJECT_NAME]',
      category: 'quotation',
      body: `Dear [SUPPLIER_NAME],

I hope this email finds you well. We are currently seeking quotations for the following items for our project [PROJECT_NAME]:

[ITEM_DETAILS]

Please provide your best quotation including:
- Unit prices
- Minimum order quantities
- Lead time
- Payment terms
- Delivery terms
- Validity period

We would appreciate receiving your quotation by [DUE_DATE].

Thank you for your time and consideration.

Best regards,
${user?.fullName || '[YOUR_NAME]'}
${user?.role || '[YOUR_TITLE]'}
[COMPANY_NAME]
Email: davecabrerarodriguez22@gmail.com
[CONTACT_DETAILS]`
    },
    {
      id: '2',
      name: 'Supplier Inquiry',
      subject: 'Partnership Inquiry - [COMPANY_NAME]',
      category: 'inquiry',
      body: `Dear [SUPPLIER_NAME],

We are interested in establishing a business relationship with your company for our procurement needs.

Our company specializes in [BUSINESS_DESCRIPTION] and we are looking for reliable suppliers for:
- [PRODUCT_CATEGORY_1]
- [PRODUCT_CATEGORY_2]
- [PRODUCT_CATEGORY_3]

Could you please provide:
- Your product catalog
- Pricing structure
- Terms and conditions
- Delivery capabilities

We look forward to a mutually beneficial partnership.

Best regards,
${user?.fullName || '[YOUR_NAME]'}
${user?.role || '[YOUR_TITLE]'}
[COMPANY_NAME]
Contact: davecabrerarodriguez22@gmail.com`
    },
    {
      id: '3',
      name: 'Follow-up Email',
      subject: 'Follow-up on Quotation Request - [PROJECT_NAME]',
      category: 'followup',
      body: `Dear [SUPPLIER_NAME],

I hope you are doing well. I am following up on our quotation request sent on [DATE] for project [PROJECT_NAME].

We would like to know the status of our request and when we can expect to receive your quotation.

If you need any additional information or clarification, please don't hesitate to contact me at davecabrerarodriguez22@gmail.com.

Thank you for your attention to this matter.

Best regards,
${user?.fullName || '[YOUR_NAME]'}
${user?.role || '[YOUR_TITLE]'}
[COMPANY_NAME]`
    },
    {
      id: '4',
      name: 'Purchase Order Approval',
      subject: 'Purchase Order Approved - PO# [PO_NUMBER]',
      category: 'approval',
      body: `Dear [SUPPLIER_NAME],

We are pleased to inform you that your quotation has been approved and we would like to proceed with the purchase order.

Purchase Order Details:
- PO Number: [PO_NUMBER]
- Project: [PROJECT_NAME]
- Total Amount: [TOTAL_AMOUNT]
- Delivery Date: [DELIVERY_DATE]

Please confirm receipt of this purchase order and provide:
- Order acknowledgment
- Delivery schedule
- Invoice details

For any questions, please contact us at davecabrerarodriguez22@gmail.com.

We look forward to working with you.

Best regards,
${user?.fullName || '[YOUR_NAME]'}
${user?.role || '[YOUR_TITLE]'}
[COMPANY_NAME]`
    }
  ];

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditedSubject(template.subject);
    setEditedBody(template.body);
  };

  const handleSendEmail = () => {
    if (!recipientEmail || !editedSubject || !editedBody) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Create mailto link with the configured email
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(editedSubject)}&body=${encodeURIComponent(editedBody)}&from=davecabrerarodriguez22@gmail.com`;
    window.open(mailtoLink);
    
    toast({
      title: "Email Prepared",
      description: "Your default email client should open with the template"
    });
  };

  const handleSendToAdmin = () => {
    const adminEmailContent = `
Subject: Email Template Used - ${selectedTemplate?.name}

Template: ${selectedTemplate?.name}
Recipient: ${recipientEmail}
Subject: ${editedSubject}

Body:
${editedBody}

---
Sent from Procurement System by ${user?.fullName}
    `;

    const adminMailto = `mailto:davecabrerarodriguez22@gmail.com?subject=Email Template Usage Notification&body=${encodeURIComponent(adminEmailContent)}`;
    window.open(adminMailto);
    
    toast({
      title: "Admin Notification Sent",
      description: "Admin has been notified of email template usage"
    });
  };

  const handleCopyTemplate = () => {
    const emailContent = `Subject: ${editedSubject}\n\n${editedBody}`;
    navigator.clipboard.writeText(emailContent);
    toast({
      title: "Copied to Clipboard",
      description: "Email template copied successfully"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Templates</span>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Connected to: davecabrerarodriguez22@gmail.com
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <Dialog key={template.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-4 w-4" />
                        <h3 className="text-sm font-medium">{template.name}</h3>
                      </div>
                      <p className="text-xs text-gray-500 capitalize">{template.category}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Email Template: {template.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipient">Recipient Email</Label>
                      <Input
                        id="recipient"
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="supplier@company.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={selectedTemplate?.id === template.id ? editedSubject : template.subject}
                        onChange={(e) => {
                          if (selectedTemplate?.id === template.id) {
                            setEditedSubject(e.target.value);
                          } else {
                            handleTemplateSelect(template);
                            setEditedSubject(e.target.value);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="body">Email Body</Label>
                      <Textarea
                        id="body"
                        value={selectedTemplate?.id === template.id ? editedBody : template.body}
                        onChange={(e) => {
                          if (selectedTemplate?.id === template.id) {
                            setEditedBody(e.target.value);
                          } else {
                            handleTemplateSelect(template);
                            setEditedBody(e.target.value);
                          }
                        }}
                        className="min-h-[300px] font-mono text-sm"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={handleSendEmail} className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Send to Supplier</span>
                      </Button>
                      <Button variant="outline" onClick={handleSendToAdmin} className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Notify Admin</span>
                      </Button>
                      <Button variant="outline" onClick={handleCopyTemplate} className="flex items-center space-x-2">
                        <Copy className="h-4 w-4" />
                        <span>Copy Template</span>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Email Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Email Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
              <Mail className="h-6 w-6" />
              <span className="font-medium">Compose New Email</span>
              <span className="text-xs text-muted-foreground">Start from scratch</span>
            </Button>
            <Button variant="outline" className="p-4 h-auto flex-col space-y-2" onClick={() => {
              const adminMailto = `mailto:davecabrerarodriguez22@gmail.com?subject=Procurement System - Quick Message`;
              window.open(adminMailto);
            }}>
              <User className="h-6 w-6" />
              <span className="font-medium">Email Admin</span>
              <span className="text-xs text-muted-foreground">davecabrerarodriguez22@gmail.com</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTemplates;
