"use client";

import { useFormContext } from "react-hook-form";
import StatusMessage from "./StatusMessage";

interface InputProps {
  name: string;
  type?: "text" | "password" | "textarea";
  placeholder?: string;
  className?: string;
  label?: string | React.ReactNode;
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
      {/* type이 'text' 또는 'password'일 경우 */}
      {!(type === "textarea") && (
        <input
          type={type}
          placeholder={placeholder}
          className={className}
          {...register(name)}
        />
      )}

      {/* type이 'textarea'일 경우 */}
      {type === "textarea" && (
        <textarea
          placeholder={placeholder}
          className={className}
          {...register(name)}
        />
      )}
      {/* 유효성 검사 통과 메세지 입력 시 노출 */}
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
