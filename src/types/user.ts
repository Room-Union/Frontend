import { CategoryType, GenderType } from "./constants";

interface UserInfo {
  email: string;
  nickname: string;
  gender: GenderType;
  categories: CategoryType[];
  profileImageUrl: string;
}

interface EditUserInfoRequest {
  profileImage: File | string;
  nickname: string;
  gender: GenderType;
  categories: CategoryType[];
}

interface EditUserPasswordRequest {
  password: string;
  newPassword: string;
}

export type { EditUserInfoRequest, EditUserPasswordRequest, UserInfo };
