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
    <div className="flex flex-col gap-2">
      {label && <Label text={label} required={required} />}
      <div className="tb:justify-start flex flex-wrap justify-center gap-[12px]">
        {options.map((option, index) => {
          return (
            <label
              htmlFor={option.value}
              key={index}
              className={`bg-gray-neutral-50 relative flex grow cursor-pointer p-[1px] has-checked:bg-linear-to-r has-checked:from-[#00a6ff] has-checked:to-[#5ccaff] ${inputVariants[type].label}`}
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
                  "typo-ui-xs-medium bg-gray-neutral-50 flex grow flex-col items-center justify-center peer-checked:bg-blue-50",
                  inputVariants[type].base,
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
          errors={errors}
          isDirty={dirtyFields}
          correctMessage={correctMessage ?? ""}
        />
      )}
    </div>
  );
};

export default OptionInput;

const inputVariants = {
  checkbox: {
    base: "w-[93px] tb:min-w-[139px] aspect-square rounded-[15px]",
    label: "rounded-[16px]",
  },
  radio: {
    base: " h-[44px] px-[16px] py-[13px] tb:px-[24px] tb:py-[14px] rounded-[11px]",
    label: "tb:flex-none rounded-[12px]",
  },
};
