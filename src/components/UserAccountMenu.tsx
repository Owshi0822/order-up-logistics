
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Settings, LogOut, Mail, Building2, Save } from "lucide-react";

interface UserAccountMenuProps {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    company?: string;
  };
  onSignOut: () => void;
}

const UserAccountMenu = ({ user, onSignOut }: UserAccountMenuProps) => {
  const { toast } = useToast();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userSettings, setUserSettings] = useState({
    fullName: user.fullName,
    email: user.email,
    company: user.company || '',
    role: user.role,
    notifications: true,
    emailUpdates: true
  });

  const handleSaveSettings = async () => {
    try {
      // TODO: Integrate with Supabase to update user profile
      console.log('Updating user settings:', userSettings);
      
      toast({
        title: "Settings saved",
        description: "Your profile has been updated successfully"
      });
      
      setIsSettingsOpen(false);
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = () => {
    toast({
      title: "Signed out",
      description: "You have been signed out successfully"
    });
    onSignOut();
  };

  return (
    <div className="flex items-center space-x-2">
      <Badge variant="secondary" className="px-3 py-1">
        <User className="h-3 w-3 mr-1" />
        {user.role}
      </Badge>
      
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Account
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Account Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="settings-name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="settings-name"
                  className="pl-10"
                  value={userSettings.fullName}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="settings-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="settings-email"
                  type="email"
                  className="pl-10"
                  value={userSettings.email}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="settings-company">Company</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="settings-company"
                  className="pl-10"
                  value={userSettings.company}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="settings-role">Role</Label>
              <Input
                id="settings-role"
                value={userSettings.role}
                onChange={(e) => setUserSettings(prev => ({ ...prev, role: e.target.value }))}
              />
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Button variant="outline" size="sm" onClick={handleSignOut}>
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default UserAccountMenu;
