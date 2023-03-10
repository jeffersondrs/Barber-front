import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
interface AuthContextData {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

type LoginProps = {
  email: string;
  password: string;
};

type User = {
  status: string;
  role: string;
  token: string;
};

export const requestLogin = async ({ email, password }: LoginProps) => {
  const response = await api.post("/master/login", { email, password });

  const user: User = {
    status: response.data.status,
    role: response.data.role,
    token: response.data.token,
  };
  localStorage.setItem("token", user.token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("id", response.data._id);
  return user;
};

export const requestRegister = async ({ email, password }: LoginProps) => {
  const response = await api.post("/master/register", { email, password });

  const user: User = {
    status: response.data.status,
    role: response.data.role,
    token: response.data.token,
  };
  localStorage.setItem("token", user.token);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const headerAuth = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("id");
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const getRole = () => {
  const role = localStorage.getItem("role");
  return role;
};
export const AuthContext = createContext({
  isAuthenticated: false,
} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const recoveryUser = localStorage.getItem("user");

    if (recoveryUser) {
      const user = JSON.parse(recoveryUser);

      if (user.status === "success") {
        setIsAuthenticated(true);
        navigate("/home");
      }
    }
  }, [isAuthenticated, navigate]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
