import { CategoryType, GenderType } from "./constants";

interface UserInfo {
  email: string;
  nickname: string;
  gender: GenderType;
  categories: CategoryType[];
  profileImageUrl: string;
}

interface EditUserPasswordRequest {
  password: string;
  newPassword: string;
}

export type { EditUserPasswordRequest, UserInfo };
