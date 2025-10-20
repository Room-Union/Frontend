"use client";

interface UseFunnelNavProps<T extends string | number> {
  steps: T[];
  currentStepIndex: number;
  setStep: React.Dispatch<React.SetStateAction<T>>;
  onCancel?: () => void;
}

export const useFunnelNav = <T extends string | number>({
  steps,
  currentStepIndex,
  setStep,
  onCancel,
}: UseFunnelNavProps<T>) => {
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) setStep(steps[currentStepIndex + 1]);
  };

  const handlePrev = () => {
    if (!isFirstStep) setStep(steps[currentStepIndex - 1]);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return {
    isFirstStep,
    isLastStep,
    handleNext,
    handlePrev,
    handleCancel,
  };
};
