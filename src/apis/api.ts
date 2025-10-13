import { BASE_URL, TEST_BASE_URL } from "@/constants/api";
import { getAccessToken } from "@/utils/token";
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
    } else {
      // 아직 getAccessToken 함수로 토큰을 받아오질 못해서, 하드 코딩으로 바꿔가시면서 테스트 해야합니다...
      config.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMSIsImVtYWlsIjoiYmVycnkzODkxQGdtYWlsLmNvbSIsImlhdCI6MTc2MDM0NDI2NCwiZXhwIjoxNzYwOTQ5MDY0fQ.gfM8Tcow4ICHZtZH6FpHUEwuobWcvhMeMErEVpwowlc";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api, test };
