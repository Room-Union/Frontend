import {
  ExtendVerificationTimeRequest,
  SendEmailRequest,
  SendVerificationCodeRequest,
} from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import {
  extendVerificationTime,
  sendEmail,
  sendVerificationCode,
} from "../auth.api";

const useSendEmail = () => {
  return useMutation({
    mutationFn: (data: SendEmailRequest) => sendEmail(data),
  });
};

const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: (data: SendVerificationCodeRequest) =>
      sendVerificationCode(data),
  });
};

const useExtendVerificationTime = () => {
  return useMutation({
    mutationFn: (data: ExtendVerificationTimeRequest) =>
      extendVerificationTime(data),
  });
};

export { useExtendVerificationTime, useSendEmail, useSendVerificationCode };
