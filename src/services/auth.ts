import api from "./api";

type LoginProps = {
  email: string;
  password: string;
};

export const token: string = "token";

export const request = async ({ email, password }: LoginProps) => {
  const response = await api.post("/master/login", { email, password });
  localStorage.setItem("token", response.data.token);

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