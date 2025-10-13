import { GenderType } from "./constants";

interface SignUpRequest {
  email: "string";
  password: "string";
  nickname: "string";
  gender: GenderType;
  categories: "string";
}

export type { SignUpRequest };
