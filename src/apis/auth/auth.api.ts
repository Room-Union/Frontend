import { SignInRequest, SignUpRequest } from "@/types/auth";
import { api, api_v2 } from "../api";

const signUpUser = async (data: SignUpRequest) => {
  await api.post("/users/sign-up", data);
};

const signInUser = async (data: SignInRequest) => {
  try {
    const response = await api_v2.post("/auth/login", data);
    return response;
  } catch (error) {
    throw new Error(`로그인 실패 : ${error}`);
  }
};

export { signInUser, signUpUser };
