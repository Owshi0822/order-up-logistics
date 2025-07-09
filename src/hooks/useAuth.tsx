
import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (userData: User) => void;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('procurementUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('procurementUser');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = (userData: User) => {
    setUser(userData);
    localStorage.setItem('procurementUser', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('procurementUser');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    signIn,
    signOut,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
