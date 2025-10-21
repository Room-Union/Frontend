import {
  SendEmailRequest,
  SendVerificationCodeRequest,
  SignInRequest,
  SignUpRequest,
} from "@/types/auth";
import axios from "axios";
import { api, api_v2 } from "../api";

const signUpUser = async (data: SignUpRequest) => {
  await api.post("/users/sign-up", data);
};

const signInUser = async (data: SignInRequest) => {
  try {
    const response = await api_v2.post("/auth/login", data);
    return response;
  } catch (error) {
    // error code에 따른 분기 처리 & message 커스터마이징
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      switch (status) {
        case 400:
          throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
        case 500:
          throw new Error(
            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        default:
          throw new Error("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      throw new Error(`로그인 실패 : ${error}`);
    }
  }
};

const sendEmail = async (data: SendEmailRequest) => {
  const response = await api.post("/auth/email/send", data);
  return response.data;
};

const sendVerificationCode = async (data: SendVerificationCodeRequest) => {
  const response = await api.post("/auth/email/verify", data);
  return response.data;
};

export { sendEmail, sendVerificationCode, signInUser, signUpUser };
