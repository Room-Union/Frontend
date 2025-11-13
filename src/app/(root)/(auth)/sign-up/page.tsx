"use client";

import useSignUp from "@/apis/auth/mutation/use-sign-up";
import {
  AuthGuard,
  EmailEntryStep,
  EmailVerificationStep,
  PasswordEntryStep,
  ProfileEntryStep,
  StepIndicator,
} from "@/components/section";
import { Progress } from "@/components/ui";
import { PATHS, SIGN_UP_STEPS } from "@/constants/constants";
import { useFunnel, useFunnelNav } from "@/hooks";
import { useToastStore } from "@/store/toast-store";
import { SignUpSchemaType } from "@/types/schema";
import handleError from "@/utils/handle-error";
import { signUpSchema } from "@/validation/sign-up-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const SignUpPage = () => {
  const router = useRouter();
  const { toast } = useToastStore();
  const { mutate: signUp, isPending } = useSignUp();

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
      verificationCode: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      gender: "FEMALE",
      categories: [],
    },
  });

  // useForm에서 제공하는 handleSubmit 함수
  const { handleSubmit, setError } = methods;

  // handleSignUpSubmit : 회원가입 폼 제출 핸들러
  const handleSignUpSubmit = async (data: SignUpSchemaType) => {
    const { verificationCode, confirmPassword, ...signUpPayLoad } = data;

    void verificationCode;
    void confirmPassword;

    signUp(signUpPayLoad, {
      onSuccess: () => {
        router.push(PATHS.SIGN_IN);
        toast({
          message: "회원가입이 완료되었습니다!",
          type: "success",
        });
      },
      onError: (error) => {
        handleError({ error, setError, toast });
      },
    });
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
                    onNext={handleNext}
                    onPrev={handlePrev}
                  />
                </Step>
                <Step name={steps[2]}>
                  <PasswordEntryStep onNext={handleNext} setStep={setStep} />
                </Step>
                <Step name={steps[3]}>
                  <ProfileEntryStep onPrev={handlePrev} isPending={isPending} />
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
