"use client";

import EmailEntryStep from "@/components/section/sign-up/email-entry-step";
import EmailVerificationStep from "@/components/section/sign-up/email-verification-step";
import PasswordEntryStep from "@/components/section/sign-up/password-entry-step";
import ProfileEntryStep from "@/components/section/sign-up/profile-entry-step";
import StepIndicator from "@/components/section/sign-up/step-indicator";
import { useState } from "react";

const SignUpPage = () => {
  const [step, setStep] = useState<number>(1);

  const moveToNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <StepIndicator step={step} />
      {/* Progress bar 추가 예정 */}
      <form className="flex min-h-screen flex-col justify-center">
        {step === 1 && <EmailEntryStep moveToNextStep={moveToNextStep} />}
        {step === 2 && (
          <EmailVerificationStep moveToNextStep={moveToNextStep} />
        )}
        {step === 3 && <PasswordEntryStep moveToNextStep={moveToNextStep} />}
        {step === 4 && <ProfileEntryStep />}
      </form>
    </div>
  );
};

export default SignUpPage;
