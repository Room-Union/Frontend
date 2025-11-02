import { BASE_URL } from "@/constants/api";
import { getAccessToken, setAccessToken } from "@/utils/auth";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (config.url?.includes("/auth/refresh")) {
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
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

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (error) {
        const response = error as AxiosError<{ message: string; code: string }>;
        const errorResponse = response.response?.data;

        if (!errorResponse) return;

        // 에러코드 : errorResponse.code
        localStorage.removeItem("accessToken");
        window.location.href = "/sign-in";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
