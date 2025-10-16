"use client";

import Label from "@/components/ui/input/label";
import { cn } from "@/utils/cn";
import { useFormContext } from "react-hook-form";
import StatusMessage, { statusMessageVariants } from "./status-message";

interface InputProps {
  name: string;
  type?: "text" | "password" | "textarea";
  placeholder?: string;
  className?: string;
  label?: string;
  showStatusMessage?: boolean;
  correctMessage?: string;
  required?: boolean;
}

const Input = ({
  name,
  type = "text",
  placeholder,
  className,
  label,
  correctMessage,
  showStatusMessage = true,
  required = true,
}: InputProps) => {
  // 부모 컴포넌트 FormProvider애서 전달된 methods를 useFormContext 훅으로 사용
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  // input & textarea 공통 스타일
  const isErrorState = Boolean(errors[name]);
  const inputBaseStyle = `typo-ui-sm-medium outline-none bg-gray-neutral-50 px-[16px] placeholder:text-gray-neutral-400 focus:border focus:border-blue-500 ${isErrorState && "border border-red-500"}`;

  return (
    <div className="flex w-full flex-col gap-[8px]">
      {label && <Label htmlFor={name} text={label} required={required} />}
      {/* type이 'text' 또는 'password'일 경우 */}
      {type !== "textarea" ? (
        <input
          type={type}
          placeholder={placeholder}
          required
          className={cn(inputBaseStyle, inputVariants.input.sm, className)}
          {...register(name)}
        />
      ) : (
        // type이 'textarea'일 경우
        <textarea
          placeholder={placeholder}
          className={cn(inputBaseStyle, inputVariants.textarea.sm, className)}
          {...register(name)}
        />
      )}
      {/* 유효성 검사 통과 메세지 입력 시 노출 */}
      {showStatusMessage && (
        <StatusMessage
          name={name}
          errors={errors}
          isDirty={dirtyFields}
          correctMessage={correctMessage ? correctMessage : ""}
          className={
            type === "textarea"
              ? `${(statusMessageVariants.textarea.sm, statusMessageVariants.textarea.md)}`
              : ""
          }
        />
      )}
    </div>
  );
};

export default Input;

// input size에 따른 variants
// InputVariants.<컴포넌트 이름>.<size | breakpoint_size>.
export const inputVariants = {
  input: {
    sm: "typo-ui-sm-medium rounded-[10px] py-[10px] h-[42px] ",
    lg: "typo-ui-md-medium rounded-[12px] py-[12px] h-[46px] ",
    tb_lg: "tb:typo-ui-md-medium tb:rounded-[12px] tb:py-[12px] tb:h-[46px] ",
  },
  textarea: {
    sm: "typo-ui-sm-normal h-[120px] resize-none py-[16px] leading-[20px] ",
    lg: "typo-ui-md-medium h-[120px] resize-none py-[16px] leading-[23px] ",
    tb_lg: "tb:typo-ui-md-medium tb:leading-[23px] ",
  },
};
