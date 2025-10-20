"use client";

import { useState } from "react";

// StepProps: step 타입을 제네릭으로 받음 (string 또는 number)
export interface StepProps<T extends string | number> {
  name: T;
  children: React.ReactNode;
}

export interface FunnelProps<T extends string | number> {
  step: T;
  children: Array<React.ReactElement<StepProps<T>>>;
}

// Step: 각 단계를 나타내는 컴포넌트
const Step = <T extends string | number>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

// Funnel: 현재 활성화된 Step을 보여주는 컴포넌트
const Funnel = <T extends string | number>({
  step,
  children,
}: FunnelProps<T>) => {
  const targetStep = children.find(
    (childStep) => childStep.props.name === step
  );
  return <>{targetStep}</>;
};

// useFunnel: step 타입을 제네릭으로 지정
export const useFunnel = <T extends string | number>(defaultStep: T) => {
  const [step, setStep] = useState<T>(defaultStep);
  return { Funnel, Step, setStep, step } as const;
};
