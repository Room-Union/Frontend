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
import { SIGN_UP_STEPS } from "@/constants/constants";
import { useFunnel, useFunnelNav } from "@/hooks";
import { useToastStore } from "@/store/toast-store";
import {
  SignUpSchemaType,
  signUpSchema,
} from "@/validation/sign-up-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const SignUpPage = () => {
  const router = useRouter();
  const { toast } = useToastStore();
  const { mutate: signUp } = useSignUp();

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
  const { handleSubmit, setError, getValues } = methods;

  // handleSignUpSubmit : 회원가입 폼 제출 핸들러
  const handleSignUpSubmit = async (data: SignUpSchemaType) => {
    const { verificationCode, confirmPassword, ...signUpPayLoad } = data;

    void verificationCode;
    void confirmPassword;

    signUp(signUpPayLoad, {
      onSuccess: () => {
        router.push("/sign-in");
        toast({
          message: "회원가입이 완료되었습니다!",
          type: "success",
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorCode = error.response?.data.code;

          // errorCode에 따라 메세지를 세분화해서 해당 필드에 setError
          switch (errorCode) {
            case "ALREADY_REGISTERED_NICKNAME":
              setError("nickname", {
                message: "이미 가입된 닉네임입니다.",
              });
              break;
            case "INVALID_INPUT_VALUE":
              setError("root", {
                type: "serverError",
                message: "잘못 입력되었습니다. 다시 시도해주세요.",
              });
              break;
            case "INTERNAL_SERVER_ERROR":
              setError("root", {
                type: "serverError",
                message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
              });
              break;
            default:
              setError("root", {
                type: "serverError",
                message: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
              });
          }
        }
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
                    setError={setError}
                    getValues={getValues}
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
