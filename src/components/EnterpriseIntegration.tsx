
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Database, RefreshCw, Settings, AlertCircle, CheckCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ERPConnection {
  id: string;
  name: string;
  type: 'SAP' | 'Oracle';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  endpoint: string;
  modules: string[];
}

interface SyncData {
  type: string;
  records: number;
  lastSync: string;
  status: 'success' | 'pending' | 'error';
}

const EnterpriseIntegration = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState<ERPConnection[]>([
    {
      id: '1',
      name: 'SAP ECC Production',
      type: 'SAP',
      status: 'connected',
      lastSync: '2024-01-20 10:30:00',
      endpoint: 'https://sap.company.com/api',
      modules: ['MM', 'FI', 'CO', 'SD']
    },
    {
      id: '2',
      name: 'Oracle EBS Finance',
      type: 'Oracle',
      status: 'disconnected',
      lastSync: '2024-01-19 15:45:00',
      endpoint: 'https://oracle.company.com/api',
      modules: ['AP', 'AR', 'GL', 'PO']
    }
  ]);

  const [syncData] = useState<SyncData[]>([
    { type: 'Purchase Orders', records: 156, lastSync: '2024-01-20 10:30:00', status: 'success' },
    { type: 'Suppliers', records: 89, lastSync: '2024-01-20 10:25:00', status: 'success' },
    { type: 'Items Master', records: 1204, lastSync: '2024-01-20 10:20:00', status: 'success' },
    { type: 'Cost Centers', records: 45, lastSync: '2024-01-20 10:15:00', status: 'pending' }
  ]);

  const [newConnection, setNewConnection] = useState({
    name: '',
    type: 'SAP' as 'SAP' | 'Oracle',
    endpoint: '',
    username: '',
    password: '',
    modules: [] as string[]
  });

  const handleSync = (connectionId: string) => {
    const connection = connections.find(c => c.id === connectionId);
    if (!connection) return;

    toast({
      title: "Sync Started",
      description: `Synchronizing data from ${connection.name}...`
    });

    // Simulate sync process
    setTimeout(() => {
      setConnections(prev => prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, lastSync: new Date().toLocaleString(), status: 'connected' as const }
          : conn
      ));
      
      toast({
        title: "Sync Completed",
        description: `Data synchronized successfully from ${connection.name}`
      });
    }, 3000);
  };

  const handleTestConnection = () => {
    if (!newConnection.name || !newConnection.endpoint) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Testing Connection",
      description: "Verifying connection to ERP system..."
    });

    // Simulate connection test
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: "Connection test completed successfully",
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'disconnected': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Enterprise System Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="connections" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="sync-status">Sync Status</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="connections" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">ERP System Connections</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Connection</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add ERP Connection</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="conn-name">Connection Name</Label>
                          <Input
                            id="conn-name"
                            value={newConnection.name}
                            onChange={(e) => setNewConnection({...newConnection, name: e.target.value})}
                            placeholder="SAP Production"
                          />
                        </div>
                        <div>
                          <Label htmlFor="conn-type">ERP Type</Label>
                          <Select value={newConnection.type} onValueChange={(value: 'SAP' | 'Oracle') => setNewConnection({...newConnection, type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SAP">SAP</SelectItem>
                              <SelectItem value="Oracle">Oracle</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="endpoint">API Endpoint</Label>
                        <Input
                          id="endpoint"
                          value={newConnection.endpoint}
                          onChange={(e) => setNewConnection({...newConnection, endpoint: e.target.value})}
                          placeholder="https://erp.company.com/api"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={newConnection.username}
                            onChange={(e) => setNewConnection({...newConnection, username: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={newConnection.password}
                            onChange={(e) => setNewConnection({...newConnection, password: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleTestConnection} variant="outline">
                          Test Connection
                        </Button>
                        <Button>Save Connection</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connections.map((connection) => (
                  <Card key={connection.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Database className="h-5 w-5 text-blue-600" />
                          <h4 className="font-medium">{connection.name}</h4>
                        </div>
                        <Badge className={`${getStatusColor(connection.status)}`} variant="secondary">
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(connection.status)}
                            <span>{connection.status}</span>
                          </div>
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-medium">{connection.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Sync:</span>
                          <span>{connection.lastSync}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Modules:</span>
                          <span>{connection.modules.join(', ')}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button 
                          onClick={() => handleSync(connection.id)} 
                          size="sm" 
                          disabled={connection.status === 'disconnected'}
                          className="flex items-center space-x-1"
                        >
                          <RefreshCw className="h-3 w-3" />
                          <span>Sync</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center space-x-1">
                          <ExternalLink className="h-3 w-3" />
                          <span>View in {connection.type}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sync-status" className="space-y-4">
              <h3 className="text-lg font-medium">Data Synchronization Status</h3>
              <div className="space-y-4">
                {syncData.map((data, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{data.type}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {data.records} records • Last sync: {data.lastSync}
                          </p>
                        </div>
                        <Badge className={data.status === 'success' ? 'bg-green-100 text-green-800' : 
                                       data.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                       'bg-red-100 text-red-800'} variant="secondary">
                          {data.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <h3 className="text-lg font-medium">Integration Settings</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Auto Sync Interval</Label>
                      <Select defaultValue="hourly">
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual Only</SelectItem>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Sync Timeout (seconds)</Label>
                      <Input type="number" defaultValue="300" />
                    </div>
                    <div>
                      <Label>Error Notification Email</Label>
                      <Input type="email" placeholder="admin@company.com" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnterpriseIntegration;
