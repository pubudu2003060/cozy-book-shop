import axios from "axios";
import { toast } from "react-toastify";

export const freeAxios = axios.create({
  baseURL: "https://localhost:5000/api",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const JWTAxios = axios.create({
  baseURL: "https://localhost:5000/api",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

JWTAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken && !userId) {
      toast.error("please sign in", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    config.headers.Authorization = `Bearer ${accessToken}`;

    config.headers.userId = userId;

    return config;
  },
  (error) => Promise.reject(error)
);

JWTAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
