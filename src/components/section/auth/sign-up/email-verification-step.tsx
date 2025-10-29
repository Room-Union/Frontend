"use client";

import { useSendVerificationCode } from "@/apis/auth/mutation/use-send-email";
import { useFormButtonDisabled } from "@/hooks";
import { useToastStore } from "@/store/toast-store";
import { SignUpSchemaType } from "@/validation/sign-up-validation";
import axios from "axios";
import {
  UseFormGetValues,
  UseFormSetError,
  useFormContext,
} from "react-hook-form";
import FormContainer from "../form-container/form-container";
import FormFooter from "../form-container/form-footer";
import FormHeader from "../form-container/form-header";
import EmailVerificationForm from "./email-verification-form";

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
    setValue,
    formState: { errors },
  } = useFormContext();
  const isError = !!errors.verificationCode;
  const { mutate: sendVerificationCode } = useSendVerificationCode();
  const { toast } = useToastStore();

  // handleNext : "다음" 버튼 클릭 시 인증코드 검증 실행
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
              toast({
                message: "서버 오류가 발생했습니다.",
                subMessage: "잠시 후 다시 시도해주세요.",
                type: "normal",
              });
              break;
            default:
              toast({
                message: "오류가 발생했습니다.",
                subMessage: "잠시 후 다시 시도해주세요.",
                type: "normal",
              });
          }
        }
      },
    });
  };

  // handlePrev : 이전 스텝으로 이동 & 인증코드 입력란 비우기
  const handlePrev = () => {
    onPrev();
    setValue("verificationCode", "");
  };

  return (
    <FormContainer>
      <div className="tb:gap-7.5 flex w-full flex-col gap-4">
        <FormHeader
          email={email}
          title={"메일로 발송된 인증코드를 입력해주세요"}
        />
        <EmailVerificationForm
          isError={isError}
          email={email}
          onPrev={handlePrev}
          setError={setError}
        />
      </div>

      <FormFooter
        text="다음"
        onPrev={handlePrev}
        onNext={handleNext}
        isDisabled={isDisabled}
      />
    </FormContainer>
  );
};

export default EmailVerificationStep;
