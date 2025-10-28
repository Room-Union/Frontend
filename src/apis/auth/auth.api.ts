import {
  ExtendVerificationTimeRequest,
  SendEmailRequest,
  SendVerificationCodeRequest,
  SignInRequest,
  SignUpRequest,
} from "@/types/auth";
import { api, api_v2 } from "../api";

const signUpUser = async (data: SignUpRequest) => {
  const response = await api.post("/users/sign-up", data);
  return response.data;
};

const signInUser = async (data: SignInRequest) => {
  const response = await api_v2.post("/auth/login", data);

  if (!response.data.token) {
    throw new Error("토큰이 존재하지 않습니다. 관리자에게 문의하세요.");
  }
  return response;
};

const sendEmail = async (data: SendEmailRequest) => {
  const response = await api.post("/auth/email/send", data);
  return response.data;
};

const sendVerificationCode = async (data: SendVerificationCodeRequest) => {
  const response = await api.post("/auth/email/verify", data);
  return response.data;
};

const extendVerificationTime = async (data: ExtendVerificationTimeRequest) => {
  const response = await api.post("/auth/email/extend", data);
  return response.data;
};

export {
  extendVerificationTime,
  sendEmail,
  sendVerificationCode,
  signInUser,
  signUpUser,
};
