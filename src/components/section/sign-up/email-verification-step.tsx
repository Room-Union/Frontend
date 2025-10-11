import { Input } from "@/components/ui";

interface EmailVerificationStepProps {
  moveToNextStep: () => void;
}
const EmailVerificationStep = ({
  moveToNextStep,
}: EmailVerificationStepProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="mx-auto text-lg">
        이메일로 발송된 인증 코드를 입력해주세요
      </h3>

      <div className="flex flex-col gap-2">
        <Input
          name="emailVerification"
          label="인증코드"
          correctMessage="인증 코드 입력 완료되었습니다."
          className="h-[60px] w-full rounded-md border border-black p-2 outline-none"
        />
      </div>
      <button
        onClick={moveToNextStep}
        className="h-[60px] w-[570px] rounded-md bg-black p-2 text-white"
      >
        확인
      </button>
    </section>
  );
};

export default EmailVerificationStep;
