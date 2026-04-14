import axios from "axios";
import { useAppStore } from "../store/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("AUTH_TOKEN");
      useAppStore.getState().reset();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;