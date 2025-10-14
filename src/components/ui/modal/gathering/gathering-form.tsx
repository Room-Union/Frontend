"use client";

import { useFunnel, useFunnelNav } from "@/hooks";
import { FormProvider, useForm } from "react-hook-form";

import { GATHERING_STEPS } from "@/constants/constants";
import { GatheringFormData } from "@/types/gathering";

import ModalNav from "../modal-nav";
import BasicInfo from "./basic-info-step";
import CapacityUrlStep from "./capacity-url-step";
import SelectCategory from "./category-step";

interface GatheringFormProps {
  onCancel?: () => void;
  onSubmit: (data: GatheringFormData) => void;
}

const GatheringForm = ({ onCancel, onSubmit }: GatheringFormProps) => {
  const methods = useForm<GatheringFormData>({
    mode: "onChange",
  });

  const handleSubmit = methods.handleSubmit(onSubmit);

  const { Funnel, Step, step, setStep } = useFunnel(GATHERING_STEPS[0]);
  const currentStepIndex = GATHERING_STEPS.indexOf(step);

  const { isFirstStep, isLastStep, handleNext, handlePrev, handleCancel } =
    useFunnelNav({
      steps: GATHERING_STEPS,
      currentStepIndex,
      setStep,
      onCancel,
    });

  return (
    <FormProvider {...methods}>
      <form
        className="tb:gap-8 mo:gap-5 flex flex-1 flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 overflow-y-auto">
          <Funnel step={step}>
            <Step name={GATHERING_STEPS[0]}>
              <SelectCategory />
            </Step>
            <Step name={GATHERING_STEPS[1]}>
              <BasicInfo />
            </Step>
            <Step name={GATHERING_STEPS[2]}>
              <CapacityUrlStep />
            </Step>
          </Funnel>
        </div>

        {/* 버튼 영역 */}
        <ModalNav
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </form>
    </FormProvider>
  );
};

export default GatheringForm;
