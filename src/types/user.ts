import { CategoryType, GenderType } from "./constants";

interface UserInfo {
  email: string;
  nickname: string;
  gender: GenderType;
  categories: CategoryType[];
  profileImageUrl: string;
}

export type { UserInfo };
