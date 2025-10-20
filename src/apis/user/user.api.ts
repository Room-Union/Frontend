import {
  EditUserInfoRequest,
  EditUserPasswordRequest,
  UserInfo,
} from "@/types/user";
import { api } from "../api";

const getUserInfo = async () => {
  const response = await api.get<UserInfo>(`/users`);
  return response.data;
};

const editUserInfo = async (params: EditUserInfoRequest) => {
  const formData = new FormData();
  if (params.profileImage) {
    formData.append("profileImage", params.profileImage);
  }
  const response = await api.put(`/users`, formData, {
    params: {
      nickname: params.nickname,
      gender: params.gender,
      categories: params.categories.join(","),
    },
  });
  return response.data;
};

const editUserPassword = async (params: EditUserPasswordRequest) => {
  const response = await api.put(`/users/password`, params);
  return response.data;
};

export { editUserInfo, editUserPassword, getUserInfo };
