import { SIGN_UP_STEPS } from "@/constants/constants";

interface StepIndicatorProps {
  step: number;
}

const StepIndicator = ({ step }: StepIndicatorProps) => {
  return (
    <div className="fixed top-28 flex items-center justify-around gap-16">
      {SIGN_UP_STEPS.map((signUpStep) => (
        <div
          key={signUpStep.id}
          className="flex items-center justify-center gap-2"
        >
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full ${
              step === signUpStep.id
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {signUpStep.id}
          </div>
          <div
            className={`text-md flex items-center font-medium ${
              step === signUpStep.id ? "text-black" : "text-gray-500"
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
