"use client";

import useSignIn from "@/apis/auth/mutation/use-sign-in";
import { AuthGuard } from "@/components/section";
import FormContainer from "@/components/section/auth/form-container/form-container";
import FormHeader from "@/components/section/auth/form-container/form-header";
import SignInForm from "@/components/section/auth/sign-in/sign-in-form";
import { useToastStore } from "@/store/toast-store";
import { OverrideFieldError } from "@/types/error";
import { SchemaType, SignInSchemaType } from "@/types/schema";
import { setAccessToken } from "@/utils/auth";
import { handleApiError } from "@/utils/handle-api-error";
import { signInSchema } from "@/validation/sign-in-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const SignInPage = () => {
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

  // useForm에서 제공하는 handleSubmit 함수
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
        // "Bearer xxxxxxx" 형식에서 토큰 부분만 추출 -> localStorage set
        const [_, token] = data.data.token.split(" ");
        setAccessToken(token);

        router.back();
        toast({
          message: "로그인에 성공했습니다!",
          type: "success",
        });
      },
      onError: async (error) => {
        resetIsDirty();

        if (axios.isAxiosError(error)) {
          const errorCode = error.response?.data.code;

          // errorCode에 따라 메세지를 세분화해서 해당 필드에 setError
          switch (errorCode) {
            case "INVALID_INPUT_VALUE":
              setError("email", { message: "" });
              setError("password", {
                message: "아이디 또는 비밀번호가 일치하지 않습니다.",
              });
              break;
            case "INTERNAL_SERVER_ERROR":
              setError("email", { message: "" });
              setError("password", {
                message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
              });
              break;
            default:
              setError("email", { message: "" });
              setError("password", {
                message: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
              });
          }
        }
      },
    });
  };

  // resetIsDirty : error state / value 유지 but. isDirty : false 로 reset.
  // submit 버튼 클릭 -> onError 일 때 실행
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
    <AuthGuard>
      <FormContainer className="tb:gap-[40px] gap-[24px]">
        <FormHeader />
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleSignInSubmit, resetIsDirty)}
            className="w-full"
          >
            <SignInForm isPending={isPending} />
          </form>
        </FormProvider>
      </FormContainer>
    </AuthGuard>
  );
};

export default SignInPage;
