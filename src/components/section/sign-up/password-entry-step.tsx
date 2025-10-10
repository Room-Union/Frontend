import { Input } from "@/components/ui";

interface PasswordEntryStepProps {
  moveToNextStep: () => void;
}

const PasswordEntryStep = ({ moveToNextStep }: PasswordEntryStepProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="mx-auto text-lg">비밀번호를 입력해주세요</h3>

      <Input
        name="password"
        type="password"
        label="비밀번호"
        className="h-[60px] w-full rounded-md border p-2 outline-none"
      />

      <Input
        name="passwordConfirm"
        label="비밀번호 확인"
        type="password"
        className="h-[60px] w-full rounded-md border p-2 outline-none"
      />

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
