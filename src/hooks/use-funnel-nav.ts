interface UseFunnelNavProps<T> {
  steps: string[];
  currentStepIndex: number;
  setStep: (step: string) => void;
  handleSubmit: (callback: (data: T) => void) => () => void;
  onSubmit?: (data: T) => void;
  onClose?: () => void;
}

export const useFunnelNav = <T>({
  steps,
  currentStepIndex,
  setStep,
  handleSubmit,
  onSubmit,
  onClose,
}: UseFunnelNavProps<T>) => {
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1]);
    } else {
      handleSubmit((data) => {
        console.log(data);
        onSubmit?.(data);
      })();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1]);
    }
  };

  const handleCancel = () => {
    onClose?.();
  };

  return {
    handleNext,
    handlePrev,
    handleCancel,
  };
};
