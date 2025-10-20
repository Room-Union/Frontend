import { Input } from "@/components/ui";

import FormContainer from "@/components/section/auth/form-container/form-container";
import FormFooter from "@/components/section/auth/form-container/form-footer";
import FormHeader from "@/components/section/auth/form-container/form-header";
import { inputVariants } from "@/components/ui/input/input";
import { useFormButtonDisabled } from "@/hooks";

interface EmailEntryStepProps {
  onNext: () => void;
}

const EmailEntryStep = ({ onNext }: EmailEntryStepProps) => {
  const { isDisabled } = useFormButtonDisabled(["email"]);

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
          onNext={onNext}
          href={"/sign-in"}
          isDisabled={isDisabled}
          isFirstStep
        />
      </div>
    </FormContainer>
  );
};

export default EmailEntryStep;
