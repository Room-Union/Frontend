import { Input } from "@/components/ui";
import { inputVariants } from "@/components/ui/input/input";
import { useFormButtonDisabled } from "@/hooks";
import FormContainer from "../form-container/form-container";
import FormFooter from "../form-container/form-footer";
import FormHeader from "../form-container/form-header";

interface EmailVerificationStepProps {
  email?: string;
  onPrev: () => void;
  onNext: () => void;
}
const EmailVerificationStep = ({
  email,
  onPrev,
  onNext,
}: EmailVerificationStepProps) => {
  const { isDisabled } = useFormButtonDisabled(["emailVerification"]);
  return (
    <FormContainer>
      <FormHeader
        email={email}
        title={"메일로 발송된 인증코드를 입력해주세요"}
      />

      <Input
        name="emailVerification"
        label="인증코드"
        required
        className={`${inputVariants.input.tb_lg}`}
        correctMessage="인증 코드 입력 완료되었습니다."
      />
      <FormFooter
        text="다음"
        onPrev={onPrev}
        onNext={onNext}
        isDisabled={isDisabled}
      />
    </FormContainer>
  );
};

export default EmailVerificationStep;
