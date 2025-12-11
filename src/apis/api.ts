import { PATHS } from "@/constants/constants";
import { setAccessToken } from "@/utils/auth";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "/api",
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    const response = error as AxiosError<{ message: string; code: string }>;
    const errorResponse = response.response?.data;

    if (!errorResponse) return;

    if (errorResponse.code === "EXPIRED_JWT" && !originalRequest?._retry) {
      if (!originalRequest) return Promise.reject(error);

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await api.post(
          "/v1/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = data.accessToken;

        setAccessToken(newAccessToken);
        onTokenRefreshed(newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (error) {
        originalRequest._retry = false;

        const response = error as AxiosError<{ message: string; code: string }>;
        const errorResponse = response.response?.data;

        if (!errorResponse) return;

        if (
          errorResponse.code === "EXPIRED_REFRESH_TOKEN" ||
          errorResponse.code === "INVALID_REFRESH_TOKEN"
        ) {
          localStorage.removeItem("accessToken");
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
