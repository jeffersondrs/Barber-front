import axios from "axios";
import { getToken } from "./auth";

const url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
