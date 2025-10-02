interface PasswordEntryStepProps {
  moveToNextStep: () => void;
}

const PasswordEntryStep = ({ moveToNextStep }: PasswordEntryStepProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="mx-auto text-lg">비밀번호를 입력해주세요</h3>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">비밀번호</label>

        <input
          type="password"
          className="h-[60px] w-[570px] rounded-md border-2 p-4"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">비밀번호 확인</label>

        <input
          type="password"
          className="h-[60px] w-[570px] rounded-md border-2 p-4"
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

export default PasswordEntryStep;
