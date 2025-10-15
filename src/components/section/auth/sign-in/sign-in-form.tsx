import { Input } from "@/components/ui";

const SignInForm = () => {
  return (
    <div className="flex w-full flex-col gap-[20px]">
      <Input
        name="userName"
        label="이메일"
        className="w-full rounded-[12px] border border-neutral-50 bg-neutral-50 p-[12px] outline-none"
      />
      <Input
        name="password"
        label="비밀번호"
        className="w-full rounded-[12px] border border-neutral-50 bg-neutral-50 p-[12px] outline-none"
      />
    </div>
  );
};

export default SignInForm;
