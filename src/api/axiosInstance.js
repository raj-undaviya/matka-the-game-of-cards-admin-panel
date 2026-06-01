import axios from "axios";
import { authStorage, getApiErrorMessage } from "@/services/authService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = {
      status: error?.response?.status,
      message: getApiErrorMessage(error),
      data: error?.response?.data,
      originalError: error,
    };

    if (normalizedError.status === 401) {
      authStorage.clearAuth();
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(normalizedError);
  }
);

export default axiosInstance;
