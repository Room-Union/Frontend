"use client";

import { useSendVerificationCode } from "@/apis/auth/mutation/use-send-email";
import { useFormButtonDisabled } from "@/hooks";
import { useToastStore } from "@/store/toast-store";
import handleError from "@/utils/handle-error";
import { useFormContext, useWatch } from "react-hook-form";
import FormContainer from "../form-container/form-container";
import FormFooter from "../form-container/form-footer";
import FormHeader from "../form-container/form-header";
import EmailVerificationForm from "./email-verification-form";

interface EmailVerificationStepProps {
  onPrev: () => void;
  onNext: () => void;
}
const EmailVerificationStep = ({
  onPrev,
  onNext,
}: EmailVerificationStepProps) => {
  const { isDisabled } = useFormButtonDisabled(["verificationCode"]);

  const {
    getValues,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const email = getValues("email");
  const verificationCode = useWatch({ name: "verificationCode", control });
  const isError = !!errors.verificationCode;
  const { mutate: sendVerificationCode, isPending } = useSendVerificationCode();
  const { toast } = useToastStore();

  // handleNext : "다음" 버튼 클릭 시 인증코드 검증 실행
  const handleNext = async () => {
    const sendVerificationCodePayload = { email, code: verificationCode };
    sendVerificationCode(sendVerificationCodePayload, {
      onSuccess: () => {
        onNext();
      },
      onError: (error) => {
        handleError({ error, setError, toast });
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
        isPending={isPending}
        isDisabled={isDisabled}
      />
    </FormContainer>
  );
};

export default EmailVerificationStep;
