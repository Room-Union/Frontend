import { useState } from "react";

export interface StepProps {
  name: string | number;
  children: React.ReactNode;
}

export interface FunnelProps {
  step: string | number;
  children: Array<React.ReactElement<StepProps>>;
}

// Step: 각 단계를 나타내는 컴포넌트
const Step = ({ children }: StepProps) => {
  return <>{children}</>;
};

// Funnel: 현재 활성화된 Step을 보여주는 컴포넌트
const Funnel = ({ step, children }: FunnelProps) => {
  const targetStep = children.find(
    (childStep) => childStep.props.name === step
  );

  return <>{targetStep}</>;
};

export const useFunnel = (defaultStep: string | number) => {
  const [step, setStep] = useState(defaultStep);

  return { Funnel, Step, setStep, step } as const;
};
