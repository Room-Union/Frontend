"use client";

import { useFormContext } from "react-hook-form";
import StatusMessage from "./StatusMessage";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  label?: string;
  correctMessage?: string;
}

const Input = ({
  name,
  type = "text",
  placeholder,
  className,
  label,
  correctMessage,
}: InputProps) => {
  // 부모 컴포넌트 FormProvider애서 전달된 methods를 useFormContext 훅으로 사용
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        {...register(name)}
      />
      {correctMessage && (
        <StatusMessage
          name={name}
          errors={errors}
          isDirty={dirtyFields}
          correctMessage={correctMessage}
        />
      )}
    </div>
  );
};

export default Input;
