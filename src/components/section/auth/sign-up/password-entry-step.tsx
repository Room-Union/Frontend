"use client";
import { Input } from "@/components/ui";
import { useFormButtonDisabled } from "@/hooks";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import FormContainer from "../form-container/form-container";
import FormFooter from "../form-container/form-footer";
import FormHeader from "../form-container/form-header";

interface PasswordEntryStepProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onNext: () => void;
}

const PasswordEntryStep = ({ setStep, onNext }: PasswordEntryStepProps) => {
  const { isDisabled } = useFormButtonDisabled(["password", "confirmPassword"]);

  const { control, trigger, getValues, setValue } = useFormContext();
  const password = useWatch({ name: "password", control });
  const confirmPassword = getValues("confirmPassword");

  // handlePrev : 비밀번호 스텝에서 "이전" 버튼 클릭 시 이메일 입력 스텝으로 이동 + 인증코드 입력값 제거
  const handlePrev = () => {
    setStep((prev) => prev - 2);
    setValue("verificationCode", "");
  };

  useEffect(() => {
    if (password.length >= 1 && confirmPassword.length >= 1) {
      trigger(["confirmPassword"]);
    }
  }, [password, trigger]);

  return (
    <FormContainer>
      <FormHeader title="비밀번호를 입력해주세요" />
      <div className="tb:gap-[30px] flex w-full flex-col gap-[16px]">
        <Input
          name="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          correctMessage="올바른 비밀번호 형식입니다"
        />

        <Input
          name="confirmPassword"
          label="비밀번호 확인"
          type="password"
          placeholder="한번 더 입력해주세요"
          correctMessage="비밀번호와 일치합니다"
        />
      </div>
      <FormFooter
        text="다음"
        onPrev={handlePrev}
        onNext={onNext}
        isDisabled={isDisabled}
      />
    </FormContainer>
  );
};

export default PasswordEntryStep;
