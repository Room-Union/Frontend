"use client";

import { signInUser } from "@/apis/auth/auth.api";
import { AuthGuard } from "@/components/section";

import FormContainer from "@/components/section/auth/form-container/form-container";
import FormHeader from "@/components/section/auth/form-container/form-header";
import SignInForm from "@/components/section/auth/sign-in/sign-in-form";
import { setAccessToken } from "@/utils/auth";
import {
  SignInSchemaType,
  signInSchema,
} from "@/validation/sign-in-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const SignInPage = () => {
  const router = useRouter();

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // useForm에서 제공하는 handleSubmit 함수
  const { handleSubmit } = methods;

  // handleSignInSubmit : 로그인 폼 제출 핸들러
  const handleSignInSubmit = async (signInPayload: SignInSchemaType) => {
    try {
      const response = await signInUser(signInPayload);

      if (!response.data.token) {
        throw new Error("토큰이 존재하지 않습니다. 관리자에게 문의하세요.");
      }

      // "Bearer xxxxxxx" 형식에서 토큰 부분만 추출 -> localStorage set
      const [_, token] = response.data.token.split(" ");
      setAccessToken(token);

      alert("로그인에 성공했습니다!");
      router.back();
    } catch (error) {
      if (error instanceof Error) alert(`${error.message}`);
    }
  };

  return (
    <AuthGuard>
      <FormContainer className="tb:gap-[40px] gap-[24px]">
        <FormHeader />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleSignInSubmit)} className="w-full">
            <SignInForm />
          </form>
        </FormProvider>
      </FormContainer>
    </AuthGuard>
  );
};

export default SignInPage;
