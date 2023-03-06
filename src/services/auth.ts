import api from "./api";

type LoginProps = {
  email: string;
  password: string;
};

export const token: string = "token";

export const request = async ({ email, password }: LoginProps) => {
  const response = await api.post("/master/login", { email, password });
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", response.data.role);
  localStorage.setItem("status", response.data.status);
  return response.data;
};

export const headerAuth = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("status");
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const getRole = () => {
  const role = localStorage.getItem("role");
  return role;
}

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};