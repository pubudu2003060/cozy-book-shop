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
  withCredentials: true,
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

JWTAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await api.post("/user/refreshaccesstoken");
      const newAccessToken = res.data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);

      JWTAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
