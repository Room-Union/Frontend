import { PATHS } from "@/constants/constants";
import axios, { AxiosError } from "axios";
import { signOutUser } from "./auth/auth.api";

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

        if (
          errorResponse.code === "EXPIRED_REFRESH_TOKEN" ||
          errorResponse.code === "INVALID_REFRESH_TOKEN" ||
          errorResponse.code === "REFRESH_TOKEN_NOT_FOUND"
        ) {
          console.clear();

          signOutUser();
          window.location.href = PATHS.SIGN_IN;
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
