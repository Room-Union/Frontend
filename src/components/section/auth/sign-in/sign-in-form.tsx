import { Input } from "@/components/ui";
import { inputVariants } from "@/components/ui/input/input";
import { useFormButtonDisabled } from "@/hooks";
import FormFooter from "../form-container/form-footer";

interface SignInFormType {
  isPending?: boolean;
}

const SignInForm = ({ isPending }: SignInFormType) => {
  const { isDisabled } = useFormButtonDisabled(["email", "password"]);
  return (
    <div className="flex w-full flex-col gap-[24px]">
      <div className="flex w-full flex-col gap-[20px]">
        <Input
          name="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          required={false}
          showStatusMessage={false}
          className={`${inputVariants.input.tb_lg}`}
        />
        <Input
          name="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          required={false}
          className={`${inputVariants.input.tb_lg}`}
        />
      </div>
      <FormFooter
        text="로그인"
        type="submit"
        href="/sign-up"
        isDisabled={isDisabled}
        isPending={isPending}
        isFirstStep
      />
    </div>
  );
};

export default SignInForm;
