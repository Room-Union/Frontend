import { SIGN_UP_STEPS } from "@/constants/constants";

interface StepIndicatorProps {
  step: number;
}

const StepIndicator = ({ step }: StepIndicatorProps) => {
  return (
    <div className="tb:flex hidden w-full items-center justify-around">
      {SIGN_UP_STEPS.map((signUpStep) => (
        <div
          key={signUpStep.id}
          className="flex items-center justify-center gap-[6px]"
        >
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full p-2 text-white ${
              step === signUpStep.id
                ? "typo-ui-xs-medium bg-blue-500"
                : "bg-gray-neutral-300 typo-ui-xs-semibold"
            }`}
          >
            {signUpStep.id}
          </div>
          <div
            className={`text-md flex items-center ${
              step === signUpStep.id
                ? "typo-body-sm-semibold text-blue-950"
                : "typo-body-sm-medium text-gray-neutral-600"
            }`}
          >
            {signUpStep.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
