import { useExtendVerificationTime } from "@/apis/auth/mutation/use-send-email";
import { Button, Input } from "@/components/ui";
import { inputVariants } from "@/components/ui/input/input";
import useTimer from "@/hooks/use-timer";
import { useToastStore } from "@/store/toast-store";

import { SignUpSchemaType } from "@/types/schema";
import { handleApiError } from "@/utils/handle-api-error";
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
  const { mutate: extendVerificationTime, isPending } =
    useExtendVerificationTime();
  const { toast } = useToastStore();

  // 인증코드 유효 시간이 만료되면 인증 코드를 다시 요청하도록 이메일 입력 스텝으로 이동
  const handleEnd = () => {
    onPrev();
    toast({
      message: "유효시간이 만료되었습니다.",
      subMessage: "다시 시도해주세요.",
      type: "normal",
    });
  };

  const { time, extendTime } = useTimer({
    initialSeconds: 180,
    onEnd: handleEnd,
  });
  const isExtendDisabled = !!(time > 60);

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
        handleApiError({ error, setError, toast });
      },
    });
  };

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
        loading={isPending}
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
