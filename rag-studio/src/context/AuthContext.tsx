import { createContext, useContext, useState } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'department_head' | 'user';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In development, start with a logged-in user
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin'
  });

  const login = async (email: string, _password?: string) => {
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      role: 'admin'
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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