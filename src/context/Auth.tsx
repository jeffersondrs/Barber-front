import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextData {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({
  isAuthenticated: false,
} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
