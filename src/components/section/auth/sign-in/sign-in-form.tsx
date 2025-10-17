import { Input, LinkButton } from "@/components/ui";
import FormFooter from "@/components/ui/form-container/form-footer";
import { inputVariants } from "@/components/ui/input/input";
import { useFormButtonDisabled } from "@/hooks";

const SignInForm = () => {
  const { isDisabled } = useFormButtonDisabled(["email", "password"]);
  return (
    <div className="flex w-full flex-col gap-[24px]">
      <div className="flex w-full flex-col gap-[20px]">
        <Input
          name="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          className={`${inputVariants.input.tb_lg}`}
        />
        <Input
          name="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          className={`${inputVariants.input.tb_lg}`}
        />
      </div>
      <div className="tb:gap-[30px] flex w-full flex-col gap-[16px]">
        <FormFooter isDisabled={isDisabled} />
        <div className="tb:typo-ui-sm-medium text-gray-neutral-500 typo-ui-xs-medium flex justify-center gap-[4px]">
          집콕이 처음이신가요?
          <LinkButton href="/sign-up" text="회원가입" />
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
