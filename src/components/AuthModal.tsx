
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Building2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    email: '', 
    password: '', 
    fullName: '', 
    company: '', 
    role: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual Supabase auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: '1',
        email: signInData.email,
        fullName: 'User Name',
        role: 'Procurement Officer'
      };
      
      onAuthSuccess(user);
      toast({
        title: "Sign in successful",
        description: "Welcome back!"
      });
      onClose();
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual Supabase auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send notification email to admin
      await sendAdminNotification(signUpData);
      
      toast({
        title: "Registration submitted",
        description: "Your account is pending approval. You'll be notified via email once approved.",
      });
      
      setSignUpData({ email: '', password: '', fullName: '', company: '', role: '' });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendAdminNotification = async (userData: typeof signUpData) => {
    // This would integrate with your email service
    const emailData = {
      to: 'davecabrerarodriguez22@gmail.com',
      subject: 'New User Registration - Procurement System',
      body: `
        A new user has registered for the Procurement System:
        
        Name: ${userData.fullName}
        Email: ${userData.email}
        Company: ${userData.company}
        Role: ${userData.role}
        
        Please review and approve this registration in the admin panel.
      `
    };
    
    console.log('Admin notification email:', emailData);
    // TODO: Integrate with actual email service
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Access Procurement System</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={signInData.email}
                    onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={signInData.password}
                    onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-name"
                    placeholder="John Doe"
                    className="pl-10"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-company">Company</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-company"
                    placeholder="Company Name"
                    className="pl-10"
                    value={signUpData.company}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, company: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-role">Role</Label>
                <Input
                  id="signup-role"
                  placeholder="e.g., Procurement Officer"
                  value={signUpData.role}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, role: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Request Access"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
