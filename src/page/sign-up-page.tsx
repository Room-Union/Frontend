"use client";

import { signUpUser } from "@/apis/auth/auth.api";
import {
  AuthGuard,
  EmailEntryStep,
  EmailVerificationStep,
  PasswordEntryStep,
  ProfileEntryStep,
  StepIndicator,
} from "@/components/section";
import { Progress } from "@/components/ui";

import { SIGN_UP_STEPS } from "@/constants/constants";
import { useFunnel, useFunnelNav } from "@/hooks";
import {
  SignUpSchemaType,
  signUpSchema,
} from "@/validation/sign-up-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const SignUpPage = () => {
  const router = useRouter();

  // steps : 회원가입 스텝 배열 / useFunnel에 props로 전달
  const steps = SIGN_UP_STEPS.map((step) => step.id);

  const { Funnel, Step, step, setStep } = useFunnel(steps[0]);
  const currentStepIndex = steps.indexOf(step);
  const { handleNext, handlePrev } = useFunnelNav({
    steps,
    currentStepIndex,
    setStep,
  });

  // 진행한 스텝 percent
  const stepPercent =
    (step / steps.length) * 100 === 100 ? 99 : (step / steps.length) * 100;

  const methods = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      emailVerification: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      gender: "FEMALE",
      categories: [],
    },
  });

  // useForm에서 제공하는 handleSubmit 함수
  const { getValues, handleSubmit } = methods;

  // email 입력값 가져오기
  const emailValue = getValues("email");

  // handleSignUpSubmit : 회원가입 폼 제출 핸들러
  const handleSignUpSubmit = async (data: SignUpSchemaType) => {
    try {
      const { emailVerification, confirmPassword, ...signUpPayLoad } = data;

      void emailVerification;
      void confirmPassword;

      console.log("회원가입 데이터:", signUpPayLoad);

      await signUpUser(signUpPayLoad);

      alert("회원가입이 완료되었습니다!");
      router.push("/sign-in");
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");

      throw new Error(`회원가입 실패 : ${error}`);
    }
  };

  return (
    <AuthGuard>
      <div className="mx-auto flex h-full w-full flex-col gap-12 pt-10">
        <div className="flex h-full w-full flex-col gap-4">
          <StepIndicator step={currentStepIndex + 1} />
          <div className="tb:gap-0 flex items-center gap-2">
            <Progress size={"lg"} percent={stepPercent} />
            <span className="tb:hidden typo-body-xs-semibold">{`${stepPercent}%`}</span>
          </div>
        </div>

        <div className="flex h-full min-h-[calc(100vh-20rem)] w-full flex-col items-center justify-center">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(handleSignUpSubmit)}
              className="flex h-auto w-full justify-center"
            >
              <Funnel step={step}>
                <Step name={steps[0]}>
                  <EmailEntryStep onNext={handleNext} />
                </Step>
                <Step name={steps[1]}>
                  <EmailVerificationStep
                    email={emailValue}
                    onNext={handleNext}
                    onPrev={handlePrev}
                  />
                </Step>
                <Step name={steps[2]}>
                  <PasswordEntryStep onNext={handleNext} onPrev={handlePrev} />
                </Step>
                <Step name={steps[3]}>
                  <ProfileEntryStep onPrev={handlePrev} />
                </Step>
              </Funnel>
            </form>
          </FormProvider>
        </div>
      </div>
    </AuthGuard>
  );
};

export default SignUpPage;
