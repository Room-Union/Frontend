import { useSendVerificationCode } from "@/apis/auth/mutation/use-send-email";
import { Input } from "@/components/ui";
import { inputVariants } from "@/components/ui/input/input";
import { useFormButtonDisabled } from "@/hooks";
import { useToastStore } from "@/store/toast-store";
import { SignUpSchemaType } from "@/validation/sign-up-validation";
import axios from "axios";
import { UseFormGetValues, UseFormSetError } from "react-hook-form";
import FormContainer from "../form-container/form-container";
import FormFooter from "../form-container/form-footer";
import FormHeader from "../form-container/form-header";

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
  const { mutate: sendVerificationCode } = useSendVerificationCode();
  const { toast } = useToastStore();

  const handleNext = async () => {
    const sendVerificationCodePayload = { email, code: verificationCode };
    sendVerificationCode(sendVerificationCodePayload, {
      onSuccess: () => {
        onNext();
        toast({
          message: "이메일 인증이 완료되었습니다.",
          type: "normal",
        });
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

  return (
    <FormContainer>
      <FormHeader
        email={email}
        title={"메일로 발송된 인증코드를 입력해주세요"}
      />

      <Input
        name="verificationCode"
        label="인증코드"
        required
        className={`${inputVariants.input.tb_lg}`}
        correctMessage="인증 코드 입력 완료되었습니다."
      />
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
