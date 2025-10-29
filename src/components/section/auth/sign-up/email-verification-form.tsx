import { useExtendVerificationTime } from "@/apis/auth/mutation/use-send-email";
import { Button, Input } from "@/components/ui";
import { inputVariants } from "@/components/ui/input/input";
import useTimer from "@/hooks/use-timer";
import { useToastStore } from "@/store/toast-store";
import { SignUpSchemaType } from "@/validation/sign-up-validation";
import axios from "axios";
import { useEffect } from "react";
import { UseFormSetError } from "react-hook-form";
import Timer from "./timer";

interface EmailVerificationFormType {
  email: string;
  isError: boolean;
  onPrev: () => void;
  setError: UseFormSetError<SignUpSchemaType>;
}

const EmailVerificationForm = ({
  email,
  isError,
  onPrev,
  setError,
}: EmailVerificationFormType) => {
  const { mutate: extendVerificationTime } = useExtendVerificationTime();
  const { toast } = useToastStore();

  const { time, extendTime } = useTimer({ initialSeconds: 180 });
  const isExtendDisabled = !!(time > 60);
  const isExpired = time === 0;

  // handleClickExtendButton : "시간 연장" 버튼 클릭 시 유효시간 연장 api 호출
  const handleClickExtendButton = async () => {
    const extendPayload = { email: email };
    extendVerificationTime(extendPayload, {
      onSuccess: () => {
        extendTime(180);
        toast({
          message: "시간 연장이 완료되었습니다.",
          type: "normal",
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorCode = error.response?.data.code;

          // errorCode에 따라 메세지를 세분화해서 해당 필드에 setError
          switch (errorCode) {
            case "40001":
              setError("verificationCode", {
                message: "잘못된 입력입니다.",
              });
              break;
            case "EMAIL_VALIDATION_NOT_FOUND":
              setError("verificationCode", {
                message: "이메일 인증 내역을 찾을 수 없습니다.",
              });
              break;
            case "ALREADY_VERIFIED_EMAIL":
              setError("verificationCode", {
                message: "이미 인증된 이메일입니다.",
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

  // 인증코드 유효 시간이 만료되면 인증 코드를 다시 요청하도록 이메일 입력 스텝으로 이동
  useEffect(() => {
    if (isExpired) {
      onPrev();
      toast({
        message: "유효시간이 만료되었습니다.",
        subMessage: "다시 시도해주세요.",
        type: "normal",
      });
    }
  }, [isExpired]);

  return (
    <div
      className={`tb:relative flex w-full flex-col items-center ${!isError && "pb-5.5"}`}
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
        disabled={isExtendDisabled}
        className="tb:absolute tb:top-7 tb:right-4 tb:order-none static order-first h-8.5"
      >
        시간 연장
      </Button>
      <Timer
        seconds={time}
        className="tb:top-19 tb:right-4.5 absolute top-43 right-5"
      />
    </div>
  );
};

export default EmailVerificationForm;
