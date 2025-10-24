import { Input } from "@/components/ui";
import { useFormButtonDisabled } from "@/hooks";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import FormContainer from "../form-container/form-container";
import FormFooter from "../form-container/form-footer";
import FormHeader from "../form-container/form-header";

interface PasswordEntryStepProps {
  onPrev: () => void;
  onNext: () => void;
}

const PasswordEntryStep = ({ onPrev, onNext }: PasswordEntryStepProps) => {
  const { isDisabled } = useFormButtonDisabled(["password", "confirmPassword"]);

  const { control, trigger, getValues } = useFormContext();
  const password = useWatch({ name: "password", control });
  const confirmPassword = getValues("confirmPassword");

  useEffect(() => {
    if (password.length && confirmPassword.length) {
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
        onPrev={onPrev}
        onNext={onNext}
        isDisabled={isDisabled}
      />
    </FormContainer>
  );
};

export default PasswordEntryStep;
