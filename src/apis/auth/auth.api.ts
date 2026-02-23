import {
  ExtendVerificationTimeRequest,
  SendEmailRequest,
  SendVerificationCodeRequest,
  SignInRequest,
  SignUpRequest,
} from "@/types/auth";
import api from "../api";

const signUpUser = async (data: SignUpRequest) => {
  const response = await api.post("/v1/users/sign-up", data);
  return response.data;
};

const signInUser = async (data: SignInRequest) => {
  const response = await api.post("/v1/auth/login", data);
  return response.data;
};

const signOutUser = async () => {
  const response = await api.post("/v1/auth/logout");
  return response.data;
};

const sendEmail = async (data: SendEmailRequest) => {
  const response = await api.post("/v1/auth/email/send", data);
  return response.data;
};

const sendVerificationCode = async (data: SendVerificationCodeRequest) => {
  const response = await api.post("/v1/auth/email/verify", data);
  return response.data;
};

const extendVerificationTime = async (data: ExtendVerificationTimeRequest) => {
  const response = await api.post("/v1/auth/email/extend", data);
  return response.data;
};

export {
  extendVerificationTime,
  sendEmail,
  sendVerificationCode,
  signInUser,
  signOutUser,
  signUpUser,
};
