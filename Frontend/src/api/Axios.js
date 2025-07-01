import axios from "axios";
import { toast } from "react-toastify";

export const freeAxios = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  validateStatus: function (status) {
    return status < 400 || (status >= 400 && status < 500);
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export const JWTAxios = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  validateStatus: function (status) {
    return status < 400 || (status >= 400 && status < 500);
  },
  headers: {
    "Content-Type": "application/json",
  },
});

JWTAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/signin";
      toast.error("Please signin first.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
