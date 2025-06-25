
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, User, Mail, Phone, MapPin, Calendar, Star, Code, Database, Smartphone } from "lucide-react";

const GuestPortfolio = () => {
  const projectFeatures = [
    "Material Requisition Form (MRF) Management",
    "Quotation Management System",
    "Purchase Order Processing",
    "Supplier Sourcing & Comparison",
    "Inventory Management",
    "Email Template System",
    "Mobile App (Android/iOS)",
    "Dark/Light Theme Support",
    "Real-time Dashboard",
    "Delivery Coordination",
    "User Authentication & Access Control",
    "Responsive Design"
  ];

  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Shadcn/UI", category: "Components" },
    { name: "Supabase", category: "Backend" },
    { name: "Capacitor", category: "Mobile" },
    { name: "Vite", category: "Build Tool" },
    { name: "Lucide React", category: "Icons" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <User className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Procurement Management System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            Full-Stack Web & Mobile Application
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </Button>
          </div>
        </div>

        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Project Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A comprehensive procurement management system designed for internal logistics and purchasing operations. 
                  This full-stack application streamlines the entire procurement workflow from material requisition to delivery coordination.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Project Timeline
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Development: January 2024 - Present<br />
                      Status: Active Development
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Key Highlights
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Mobile-First Design<br />
                      Real-time Data Sync<br />
                      Enterprise Integration Ready
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Technical Specs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Frontend</span>
                    <Badge variant="secondary">React + TypeScript</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backend</span>
                    <Badge variant="secondary">Supabase</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mobile</span>
                    <Badge variant="secondary">Capacitor</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Deployment</span>
                    <Badge variant="secondary">Lovable Platform</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Core Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <div key={index} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h4 className="font-medium text-sm mb-1">{tech.name}</h4>
                  <p className="text-xs text-gray-500">{tech.category}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Screenshots/Demo Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Application Screenshots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 rounded-lg p-8 text-center">
                <Smartphone className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Mobile App</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Native mobile experience with offline capabilities
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-700 dark:to-gray-600 rounded-lg p-8 text-center">
                <Database className="h-16 w-16 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold mb-2">Dashboard</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Real-time analytics and process monitoring
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Developer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Details</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">developer@company.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Available for Remote Work</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Project Links</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub Repository
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Application
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestPortfolio;
