import { UserInfo } from "@/types/user";
import { api } from "../api";

const getUserInfo = async () => {
  const response = await api.get<UserInfo>(`/users`);
  return response.data;
};

export { getUserInfo };
