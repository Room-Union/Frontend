import { SendEmailRequest, SendVerificationCodeRequest } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { sendEmail, sendVerificationCode } from "../auth.api";

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

export { useSendEmail, useSendVerificationCode };
