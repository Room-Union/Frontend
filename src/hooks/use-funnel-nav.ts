interface UseFunnelNavProps {
  steps: string[];
  currentStepIndex: number;
  setStep: (step: string) => void;
  onCancel?: () => void;
}

export const useFunnelNav = ({
  steps,
  currentStepIndex,
  setStep,
  onCancel,
}: UseFunnelNavProps) => {
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1]);
    }
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
