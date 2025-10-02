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
        <div className="flex justify-between">
          <label htmlFor="emailVerification">인증 코드</label>
          <div className="flex items-center gap-2">
            <span className="text-[#7F7F7F]">03:00</span>

            <button className="rounded-md border border-[#7F7F7F] p-1 text-[#7F7F7F]">
              시간 연장
            </button>
          </div>
        </div>

        <input
          name="emailVerification"
          className="h-[60px] w-[570px] rounded-md border-2 p-4"
        />
      </div>

      <button
        onClick={moveToNextStep}
        className="h-[60px] w-[570px] rounded-md bg-black p-2 text-white"
      >
        인증
      </button>
    </section>
  );
};

export default EmailVerificationStep;
