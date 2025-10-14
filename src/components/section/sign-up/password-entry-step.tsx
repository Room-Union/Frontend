import { Input } from "@/components/ui";
import { useFormButtonDisabled } from "@/hooks";

interface PasswordEntryStepProps {
  onNext: () => void;
}

const PasswordEntryStep = ({ onNext }: PasswordEntryStepProps) => {
  const { isDisabled } = useFormButtonDisabled(["password", "confirmPassword"]);
  return (
    <section className="flex flex-col gap-4">
      <h3 className="mx-auto text-lg">비밀번호를 입력해주세요</h3>

      <Input
        name="password"
        type="password"
        label="비밀번호"
        correctMessage="올바른 비밀번호 형식입니다."
        className="h-[60px] w-full rounded-md border p-2 outline-none"
      />

      <Input
        name="confirmPassword"
        label="비밀번호 확인"
        type="password"
        correctMessage="비밀번호와 일치합니다."
        className="h-[60px] w-full rounded-md border p-2 outline-none"
      />
      <button
        onClick={onNext}
        className="h-[60px] w-[570px] rounded-md bg-black p-2 text-white disabled:bg-gray-300"
        disabled={isDisabled}
      >
        확인
      </button>
    </section>
  );
};

export default PasswordEntryStep;
