"use client";

import useSignIn from "@/apis/auth/mutation/use-sign-in";
import { Input } from "@/components/ui";
import { inputVariants } from "@/components/ui/input/input";
import { PATHS } from "@/constants/constants";
import { useToastStore } from "@/store/toast-store";
import { OverrideFieldError } from "@/types/error";
import { SignInSchemaType } from "@/types/schema";
import { setAccessToken } from "@/utils/auth";
import handleError from "@/utils/handle-error";
import { signInSchema } from "@/validation/sign-in-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormFooter from "../form-layout/form-footer";

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToastStore();
  const { mutate: signIn, isPending } = useSignIn();

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
    shouldFocusError: false, // error 상태일 경우, 해당 input focus 설정 해제
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { dirtyFields },
  } = methods;

  // handleSignInSubmit : 로그인 폼 제출 핸들러
  const handleSignInSubmit = async (signInPayload: SignInSchemaType) => {
    signIn(signInPayload, {
      onSuccess: (data) => {
        const { accessToken } = data;
        setAccessToken(accessToken);

        router.back();
        toast({
          message: "로그인 성공했습니다!",
          type: "success",
        });
      },
      onError: async (error) => {
        resetIsDirty();

        const fieldErrors: OverrideFieldError<SignInSchemaType>[] = [
          {
            code: "INVALID_INPUT_VALUE",
            field: "email",
            message: "",
          },
          {
            code: "INVALID_INPUT_VALUE",
            field: "password",
            message: "아이디 혹은 비밀번호가 일치하지 않습니다.",
          },
        ];

        handleError({ error, setError, toast, fieldErrors });
      },
    });
  };

  // resetIsDirty : error state & value 유지 + isDirty : false 로 reset.
  // submit 버튼 클릭 -> onError / 유효성 검사 실패 시 실행
  const resetIsDirty = () => {
    reset(undefined, { keepErrors: true, keepValues: true });
  };

  // 하나의 필드라도 isDirty : false -> true 변환될 경우 실행
  useEffect(() => {
    if (!!dirtyFields.email || !!dirtyFields.password) {
      clearErrors(["email", "password"]);
    }
  }, [dirtyFields["email"], dirtyFields["password"]]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSignInSubmit, resetIsDirty)}
        className="w-full"
      >
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
            href={PATHS.SIGN_UP}
            fields={["email", "password"]}
            isPending={isPending}
            isFirstStep
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default SignInForm;
