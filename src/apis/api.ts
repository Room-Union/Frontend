import { BASE_URL, TEST_BASE_URL } from "@/constants/api";
import { getAccessToken } from "@/hooks/token";
import axios from "axios";

const test = axios.create({
  baseURL: TEST_BASE_URL,
});

const api = axios.create({
  baseURL: BASE_URL,
});

// localStorage에 token 있을 경우 요청 헤더에 token 추가
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api, test };
