import { useAuthStore } from "@/store/auth-store";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "/api",
});

let isRefreshing = false;
let requestQueue: (() => void)[] = [];

const retryQueuedRequests = () => {
  requestQueue.forEach((callback) => callback());
  requestQueue = [];
};

const addRequestQueue = (callback: () => void) => {
  requestQueue.push(callback);
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    const response = error as AxiosError<{ message: string; code: string }>;
    const errorResponse = response.response?.data;

    if (!errorResponse) return Promise.reject(error);

    if (
      errorResponse.code === "UNAUTHORIZED_TOKEN" &&
      !originalRequest?._retry
    ) {
      console.clear();

      if (!originalRequest) return Promise.reject(error);

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRequestQueue(() => {
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        await api.post("/v1/auth/refresh", {});

        retryQueuedRequests();

        return api(originalRequest);
      } catch (error) {
        originalRequest._retry = false;

        retryQueuedRequests();

        const response = error as AxiosError<{ message: string; code: string }>;
        const errorResponse = response.response?.data;

        if (!errorResponse) return Promise.reject(error);

        if (errorResponse.code === "REFRESH_TOKEN_NOT_FOUND") {
          useAuthStore.getState().setSignedOut();
          console.clear();
        }

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
