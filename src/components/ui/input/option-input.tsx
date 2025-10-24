"use client";

import { OptionType } from "@/types/constants";
import { cn } from "@/utils/cn";
import { useFormContext } from "react-hook-form";
import Label from "./label";
import StatusMessage from "./status-message";

interface OptionInputProps {
  type?: "radio" | "checkbox";
  name: string;
  label?: string;
  count?: number;
  options: OptionType[];
  className?: string;
  correctMessage?: string;
  showStatusMessage?: boolean;
  required?: boolean;
}

const OptionInput = ({
  type = "checkbox",
  name,
  label,
  options,
  className,
  required,
  correctMessage,
  showStatusMessage = true,
}: OptionInputProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  return (
    <div className="flex w-full flex-col gap-2">
      {label && <Label text={label} required={required} />}
      <div
        className={`${type === "radio" && "tb:justify-start"} tb:gap-[20px] flex flex-wrap justify-center gap-[12px]`}
      >
        {options.map((option, index) => {
          return (
            <label
              htmlFor={option.value}
              key={index}
              className={`bg-gray-neutral-50 relative flex cursor-pointer p-[1px] has-checked:bg-linear-to-r has-checked:from-[#00a6ff] has-checked:to-[#5ccaff] ${optionInputVariants[type].label}`}
            >
              <input
                id={option.value}
                type={type}
                value={option.value}
                required={required}
                {...register(name)}
                className="peer absolute opacity-0"
              ></input>
              <div
                className={cn(
                  "bg-gray-neutral-50 flex flex-col items-center justify-center text-neutral-500 peer-checked:bg-blue-50 peer-checked:text-neutral-900",
                  optionInputVariants[type].base,
                  className
                )}
              >
                {option.icon &&
                  option.icon(
                    "w-[36px] h-[36px] flex items-center justify-center mb-1"
                  )}
                {option.name}
              </div>
            </label>
          );
        })}
      </div>
      {showStatusMessage && (
        <StatusMessage
          name={name}
          dirtyFields={dirtyFields}
          correctMessage={correctMessage ?? ""}
        />
      )}
    </div>
  );
};

export default OptionInput;

// input type에 따른 variants
// base : 배경 색상 / 아이콘 / 텍스트 담당 | label : border 담당
const optionInputVariants = {
  checkbox: {
    base: "typo-ui-xs-medium peer-checked:typo-ui-xs-semibold tb:typo-ui-md-medium tb:peer-checked:typo-ui-md-semibold w-[91px] tb:w-[136px] aspect-square rounded-[15px] ",
    label: "rounded-[16px]",
  },
  radio: {
    base: "typo-ui-sm-medium tb:typo-ui-md-medium peer-checked:typo-ui-sm-semibold tb:peer-checked:typo-ui-md-semibold w-[91px] tb:w-auto h-[44px] px-[13px] py-[13px] tb:px-[24px] tb:py-[14px] rounded-[11px]",
    label: "rounded-[12px]",
  },
};
