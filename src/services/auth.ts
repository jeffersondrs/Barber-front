import api from "./api";

type LoginProps = {
  email: string;
  password: string;
  role: string;
};

export const token: string = "token";

export const request = async ({ email, password, role }: LoginProps) => {
  const response = await api.post("/master/login", { email, password });
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", role);
  
  return response.data;
};

export const headerAuth = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};