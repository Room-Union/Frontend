import { api } from "../api";

const getUserInfo = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

export { getUserInfo };
