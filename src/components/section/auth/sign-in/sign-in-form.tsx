import { Input } from "@/components/ui";
import FormFooter from "@/components/ui/form-container/form-footer";
import { useFormButtonDisabled } from "@/hooks";

const SignInForm = () => {
  const { isDisabled } = useFormButtonDisabled(["email", "password"]);
  return (
    <>
      <div className="flex w-full flex-col gap-[20px]">
        <Input
          name="email"
          label="이메일"
          className="w-full rounded-[12px] border border-neutral-50 bg-neutral-50 p-[12px] outline-none"
        />
        <Input
          name="password"
          label="비밀번호"
          className="w-full rounded-[12px] border border-neutral-50 bg-neutral-50 p-[12px] outline-none"
        />
      </div>
      <FormFooter isDisabled={isDisabled} />
        <div className="flex justify-center">
          집콕이 처음이신가요?
          <Link href="/sign-up" className="ml-2 underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
