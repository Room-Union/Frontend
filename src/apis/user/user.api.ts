import { EditUserPasswordRequest, UserInfo } from "@/types/user";
import { api } from "../api";

const getUserInfo = async () => {
  const response = await api.get<UserInfo>(`/users`);
  return response.data;
};

const editUserPassword = async (params: EditUserPasswordRequest) => {
  const response = await api.put(`/users/password`, params);
  return response.data;
};

export { editUserPassword, getUserInfo };
