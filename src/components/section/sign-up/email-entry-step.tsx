import { Input } from "@/components/ui";
import { useFormButtonDisabled } from "@/hooks";
import Link from "next/link";

interface EmailEntryStepProps {
  onNext: () => void;
}

const EmailEntryStep = ({ onNext }: EmailEntryStepProps) => {
  const { isDisabled } = useFormButtonDisabled(["email"]);

  return (
    <section className="flex flex-col gap-4">
      <h3 className="mx-auto text-lg">인증을 위한 이메일을 입력해주세요.</h3>
      <Input
        name="email"
        label="이메일"
        correctMessage="올바른 이메일 형식입니다."
        className="h-[60px] w-full rounded-md border p-2 outline-none"
      />
      <button
        onClick={onNext}
        className="h-[60px] w-[570px] cursor-pointer rounded-md bg-black p-2 text-white disabled:bg-gray-300"
        disabled={isDisabled}
      >
        인증 코드 받기
      </button>
      <div className="mx-auto">
        아이디가 있으신가요?
        <Link href="/sign-in" className="underline">
          로그인
        </Link>
      </div>
    </section>
  );
};

export default EmailEntryStep;
