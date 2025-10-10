"use client";

import {
  EmailEntryStep,
  EmailVerificationStep,
  PasswordEntryStep,
  ProfileEntryStep,
  StepIndicator,
} from "@/components/section";
import { signUpSchema } from "@/validation/sign-up-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const SignUpPage = () => {
  const [step, setStep] = useState<number>(1);

  const methods = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      gender: "female",
      categories: [],
    },
  });

  const handleSubmit = methods.handleSubmit;

  const moveToNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <StepIndicator step={step} />
      {/* Progress bar 추가 예정 */}

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit((data) => console.log(data))}
          className="flex flex-col"
        >
          {step === 1 && <EmailEntryStep moveToNextStep={moveToNextStep} />}
          {step === 2 && (
            <EmailVerificationStep moveToNextStep={moveToNextStep} />
          )}
          {step === 3 && <PasswordEntryStep moveToNextStep={moveToNextStep} />}
          {step === 4 && <ProfileEntryStep />}
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
