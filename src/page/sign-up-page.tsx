"use client";

import {
  EmailEntryStep,
  EmailVerificationStep,
  PasswordEntryStep,
  ProfileEntryStep,
  StepIndicator,
} from "@/components/section";
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
