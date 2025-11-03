"use client";

import { useSendEmail } from "@/apis/auth/mutation/use-send-email";
import FormContainer from "@/components/section/auth/form-container/form-container";
import FormFooter from "@/components/section/auth/form-container/form-footer";
import FormHeader from "@/components/section/auth/form-container/form-header";
import { Input } from "@/components/ui";
import { inputVariants } from "@/components/ui/input/input";
import { useFormButtonDisabled } from "@/hooks";
import { useToastStore } from "@/store/toast-store";
import { OverrideFieldError } from "@/types/error";
import { SchemaType, SendEmailSchemaType } from "@/types/schema";
import { handleApiError } from "@/utils/handle-api-error";

import { useFormContext, useWatch } from "react-hook-form";

interface EmailEntryStepProps {
  onNext: () => void;
}

const EmailEntryStep = ({ onNext }: EmailEntryStepProps) => {
  const { isDisabled } = useFormButtonDisabled(["email"]);
  const { control, setError } = useFormContext();
  const email = useWatch({ control, name: "email" });
  const { mutate: sendEmail, isPending } = useSendEmail();
  const { toast } = useToastStore();

  // 이메일 인증 코드 발송 요청 api 전송 함수
  const handleNext = async () => {
    const sendEmailPayload: SendEmailSchemaType = { email: email };

    sendEmail(sendEmailPayload, {
      onSuccess: () => {
        onNext();
      },
      onError: (error) => {
        const fieldErrors: OverrideFieldError<SchemaType>[] = [
          {
            code: "ALREADY_REGISTERED_EMAIL",
            field: "email",
          },
        ];
        handleApiError({ error, setError, toast, fieldErrors });
      },
    });
  };

  return (
    <FormContainer className="tb:gap-[24px] gap-[24px]">
      <FormHeader title="인증 받을 이메일을 입력해주세요" />
      <div className="tb:gap-[30px] flex w-full flex-col gap-[20px]">
        <Input
          name="email"
          label="이메일"
          required
          className={`${inputVariants.input.tb_lg}`}
          correctMessage="올바른 이메일 형식입니다."
        />
        <FormFooter
          text="다음"
          onNext={handleNext}
          href={"/sign-in"}
          isDisabled={isDisabled}
          isPending={isPending}
          isFirstStep
        />
      </div>
    </FormContainer>
  );
};

export default EmailEntryStep;
