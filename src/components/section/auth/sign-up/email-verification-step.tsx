"use client";

import {
  useExtendVerificationTime,
  useSendVerificationCode,
} from "@/apis/auth/mutation/use-send-email";
import { Button, Input } from "@/components/ui";
import { inputVariants } from "@/components/ui/input/input";
import { useFormButtonDisabled } from "@/hooks";
import { useToastStore } from "@/store/toast-store";
import { SignUpSchemaType } from "@/validation/sign-up-validation";
import axios from "axios";
import { useState } from "react";
import {
  UseFormGetValues,
  UseFormSetError,
  useFormContext,
} from "react-hook-form";
import FormContainer from "../form-container/form-container";
import FormFooter from "../form-container/form-footer";
import FormHeader from "../form-container/form-header";
import Timer from "./timer";

interface EmailVerificationStepProps {
  onPrev: () => void;
  onNext: () => void;
  setError: UseFormSetError<SignUpSchemaType>;
  getValues: UseFormGetValues<SignUpSchemaType>;
}
const EmailVerificationStep = ({
  setError,
  getValues,
  onPrev,
  onNext,
}: EmailVerificationStepProps) => {
  const { isDisabled } = useFormButtonDisabled(["verificationCode"]);
  const [email, verificationCode] = getValues(["email", "verificationCode"]);
  const {
    formState: { errors },
  } = useFormContext();
  const { mutate: sendVerificationCode } = useSendVerificationCode();
  const { mutate: extendVerificationTime } = useExtendVerificationTime();
  const { toast } = useToastStore();

  const [extendSeconds, setExtendSeconds] = useState<number>(0);

  const handleNext = async () => {
    const sendVerificationCodePayload = { email, code: verificationCode };
    sendVerificationCode(sendVerificationCodePayload, {
      onSuccess: () => {
        onNext();
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorCode = error.response?.data.code;

          // errorCode에 따라 메세지를 세분화해서 해당 필드에 setError
          switch (errorCode) {
            case "EXPIRED_CODE":
              setError("verificationCode", {
                message: "만료된 인증코드입니다.",
              });
              break;
            case "INVALID_CODE":
              setError("verificationCode", {
                message: "인증 코드를 확인해주세요.",
              });
              break;
            case "INTERNAL_SERVER_ERROR":
              setError("verificationCode", {
                message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
              });
              break;
            default:
              setError("verificationCode", {
                message: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
              });
          }
        }
      },
    });
  };

  const handleClickExtendButton = async () => {
    const extendPayload = { email: email };
    extendVerificationTime(extendPayload, {
      onSuccess: () => {
        setExtendSeconds(180);
        toast({
          message: "시간 연장이 완료되었습니다.",
          type: "normal",
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorCode = error.response?.data.code;

          console.error(error);

          // errorCode에 따라 메세지를 세분화해서 해당 필드에 setError
          switch (errorCode) {
            case "40001":
              toast({
                message: "잘못된 입력입니다.",
                type: "normal",
              });
              break;
            case "EMAIL_VALIDATION_NOT_FOUND":
              toast({
                message: "이메일 인증 내역을 찾지 못했습니다.",
                type: "normal",
              });
              break;
            case "ALREADY_VERIFIED_EMAIL":
              toast({
                message: "이미 인증된 이메일입니다.",
                type: "normal",
              });
              break;
            case "INTERNAL_SERVER_ERROR":
              toast({
                message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
                type: "normal",
              });
              break;
            default:
              toast({
                message: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
                type: "normal",
              });
          }
        }
      },
    });
  };

  return (
    <FormContainer>
      <div className="tb:gap-7.5 flex w-full flex-col gap-4">
        <FormHeader
          email={email}
          title={"메일로 발송된 인증코드를 입력해주세요"}
        />
        <div
          className={`tb:relative flex w-full flex-col items-center ${!errors.verificationCode && "pb-5.5"}`}
        >
          <Input
            name="verificationCode"
            label="인증코드"
            placeholder="인증 코드 입력"
            required
            className={`${inputVariants.input.tb_lg} tb:order-none order-second pr-[109px]`}
            correctMessage="인증 코드 입력 완료되었습니다."
          />

          <Button
            variant="secondary"
            size="sm"
            onClick={handleClickExtendButton}
            className="tb:absolute tb:top-7 tb:right-4 tb:order-none static order-first h-8.5"
          >
            시간 연장
          </Button>
          <Timer
            initialSeconds={180}
            extendSeconds={extendSeconds}
            className="tb:top-19 tb:right-4.5 absolute top-43 right-5"
          />
        </div>
      </div>

      <FormFooter
        text="다음"
        onPrev={onPrev}
        onNext={handleNext}
        isDisabled={isDisabled}
      />
    </FormContainer>
  );
};

export default EmailVerificationStep;
