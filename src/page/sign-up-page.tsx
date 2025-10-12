"use client";

import {
  EmailEntryStep,
  EmailVerificationStep,
  PasswordEntryStep,
  ProfileEntryStep,
  StepIndicator,
} from "@/components/section";
import {
  emailEntrySchema,
  emailVerificationEntrySchema,
  passwordEntrySchema,
  profileEntrySchema,
  signUpSchemaType,
} from "@/validation/sign-up-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const SignUpPage = () => {
  const [step, setStep] = useState<number>(1);
  const stepSchema = [
    emailEntrySchema,
    emailVerificationEntrySchema,
    passwordEntrySchema,
    profileEntrySchema,
  ];

  const { Funnel, Step, step, setStep } = useFunnel(steps[0]);

  const methods = useForm<signUpSchemaType>({
    resolver: zodResolver(stepSchema[step - 1]),
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const handleSignUpSubmit = () => {
    const allValues = methods.getValues();
    console.log("submit : ", allValues);
  };

  const moveToNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <StepIndicator step={step} />
      {/* Progress bar 추가 예정 */}

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSignUpSubmit)}
          className="flex flex-col"
        >
          <Funnel step={step}>
            <Step name="EmailEntryStep">
              <EmailEntryStep moveToNextStep={moveToNextStep} />
            </Step>
            <Step name="EmailVerificationStep">
            <EmailVerificationStep moveToNextStep={moveToNextStep} />
            </Step>
            <Step name="PasswordEntryStep">
              <PasswordEntryStep moveToNextStep={moveToNextStep} />
            </Step>
            <Step name="ProfileEntryStep">
              <ProfileEntryStep />{" "}
            </Step>
          </Funnel>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
