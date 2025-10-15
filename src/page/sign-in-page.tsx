"use client";

import FormContainer from "@/components/section/auth/form-container/form-container";
import FormFooter from "@/components/section/auth/form-container/form-footer";
import FormHeader from "@/components/section/auth/form-container/form-header";
import SignInForm from "@/components/section/auth/sign-in/sign-in-form";

import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

const SignInPage = () => {
  const methods = useForm();
  return (
    <FormContainer>
      <FormHeader />
      <FormProvider {...methods}>
        <form className="w-full">
          <SignInForm />
          <FormFooter />
          <div className="mt-[30px] flex justify-center">
            집콕이 처음이신가요?
            <Link href="/sign-up" className="ml-2 underline">
              회원가입
            </Link>
          </div>
        </form>
      </FormProvider>
    </FormContainer>
  );
};

export default SignInPage;
