"use client";

import { useFormButtonDisabled, useFunnel, useFunnelNav } from "@/hooks";
import { FormProvider, useForm } from "react-hook-form";

import { GATHERING_STEP_FIELDS, GATHERING_STEPS } from "@/constants/constants";
import type { GatheringFormInput } from "@/types/gathering";

import BasicInfo from "@/components/ui/modal/gathering/form/basic-info-step";
import CapacityUrlStep from "@/components/ui/modal/gathering/form/capacity-url-step";
import SelectCategory from "@/components/ui/modal/gathering/form/category-step";
import ModalNav from "@/components/ui/modal/modal-nav";
import { gatheringFormOptions } from "@/form-options/gathering-form-option";
import { type GatheringSchemaType } from "@/validation/gathering-validation";

interface GatheringFormProps {
  onCancel?: () => void;
  onSubmit: (data: GatheringFormInput) => void;
  defaultValues?: GatheringFormInput;
}

const GatheringForm = ({
  onCancel,
  onSubmit,
  defaultValues,
}: GatheringFormProps) => {
  const methods = useForm<GatheringSchemaType>(
    gatheringFormOptions({ defaultValues })
  );

  const handleSubmit = methods.handleSubmit(onSubmit);

  const { Funnel, Step, step, setStep } = useFunnel(GATHERING_STEPS[0]);
  const currentStepIndex = GATHERING_STEPS.indexOf(step);

  const { isDisabled } = useFormButtonDisabled(
    GATHERING_STEP_FIELDS[step],
    methods
  );

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
        className="tb:gap-8 mo:gap-5 scrollbar-hide flex flex-1 flex-col overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <div className="tb:gap-6 mo:gap-5 flex flex-col">
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

        <ModalNav
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onPrev={handlePrev}
          onNext={handleNext}
          disabled={isDisabled}
        />
      </form>
    </FormProvider>
  );
};

export default GatheringForm;
