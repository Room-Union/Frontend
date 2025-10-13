"use client";

import {
  EmailEntryStep,
  EmailVerificationStep,
  PasswordEntryStep,
  ProfileEntryStep,
  StepIndicator,
} from "@/components/section";
import { SIGN_UP_STEPS } from "@/constants/constants";
import { useFunnel, useFunnelNav } from "@/hooks";
import {
  signUpSchema,
  signUpSchemaType,
} from "@/validation/sign-up-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const SignUpPage = () => {
  // currentStepIndex : 현재 스텝의 인덱스
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const steps = SIGN_UP_STEPS.map((step) => step.value);

  const { Funnel, Step, step, setStep } = useFunnel(steps[0]);

  const { handleNext, handlePrev } = useFunnelNav({
    steps,
    currentStepIndex,
    setStep,
  });

  const methods = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema[currentStepIndex]),
    mode: "onChange",
    defaultValues: {
      gender: "female",
      categories: [],
    },
  });

  const { handleSubmit } = methods;

  const handleSignUpSubmit = () => {
    const allValues = methods.getValues();
    console.log("submit : ", allValues);
  };

  // step이 변경될 때마다 currentStepIndex 동기화
  useEffect(() => {
    setCurrentStepIndex(steps.indexOf(step));
  }, [step, setStep]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <StepIndicator step={currentStepIndex} />
      {/* Progress bar 추가 예정 */}

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSignUpSubmit)}
          className="flex flex-col"
        >
          <Funnel step={step}>
            <Step name="EmailEntryStep">
              <EmailEntryStep onNext={handleNext} />
            </Step>
            <Step name="EmailVerificationStep">
              <EmailVerificationStep onNext={handleNext} />
            </Step>
            <Step name="PasswordEntryStep">
              <PasswordEntryStep onNext={handleNext} />
            </Step>
            <Step name="ProfileEntryStep">
              <ProfileEntryStep />
            </Step>
          </Funnel>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
