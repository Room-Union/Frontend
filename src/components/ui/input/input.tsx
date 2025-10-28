"use client";

import { VisibilityOff, VisibilityOn } from "@/assets/icons";
import Label from "@/components/ui/input/label";
import { cn } from "@/utils/cn";
import { useState } from "react";
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

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const isPassword = type === "password";

  // input & textarea 공통 스타일
  const isErrorState = !!errors[name];

  const inputBaseStyle = cn(
    "w-full typo-ui-sm-medium outline-none bg-gray-neutral-50 px-[16px] placeholder:text-gray-neutral-400 focus:inset-ring focus:inset-ring-blue-500",
    isErrorState && "inset-ring inset-ring-red-500"
  );

  return (
    <div className="tb:gap-[8px] flex w-full flex-col gap-[6px]">
      {label && <Label htmlFor={name} text={label} required={required} />}
      {/* type이 'text' 또는 'password'일 경우 */}
      {type !== "textarea" ? (
        <div className="relative w-full">
          <input
            type={
              type === "text" || (type === "password" && !passwordVisible)
                ? type
                : "text"
            }
            placeholder={placeholder}
            required
            className={cn(
              inputBaseStyle,
              inputVariants.input.sm,
              isPassword && "pr-[48px]",
              className
            )}
            {...register(name)}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute top-1/2 right-4 -translate-y-1/2"
            >
              {passwordVisible ? (
                // 패스워드가 텍스트로 노출될 때
                <VisibilityOff
                  stroke="none"
                  className="text-gray-neutral-400 tb:w-[24px] w-[18px] cursor-pointer"
                />
              ) : (
                // 패스워드가 *****로 노출될 때
                <VisibilityOn
                  stroke="none"
                  className="text-gray-neutral-400 tb:w-[24px] w-[18px] cursor-pointer"
                />
              )}
            </button>
          )}
        </div>
      ) : (
        // type이 'textarea'일 경우
        <textarea
          placeholder={placeholder}
          className={cn(
            inputBaseStyle,
            inputVariants.textarea.sm,
            inputVariants.textarea.tb_lg,
            className
          )}
          {...register(name)}
        />
      )}
      {/* 유효성 검사 통과 메세지 입력 시 노출 */}
      {showStatusMessage && (
        <StatusMessage
          name={name}
          dirtyFields={dirtyFields}
          correctMessage={correctMessage ? correctMessage : ""}
          className={
            type === "textarea"
              ? `${(statusMessageVariants.textarea.sm, statusMessageVariants.textarea.tb_md)}`
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
    fixed: "typo-ui-md-medium rounded-[12px] py-[12px] h-[42px] w-[144px]",
  },
  textarea: {
    sm: "rounded-[12px] typo-body-sm-medium h-[120px] resize-none py-[16px]  ",
    tb_lg: "rounded-[12px] tb:typo-body-md-medium ",
  },
};
