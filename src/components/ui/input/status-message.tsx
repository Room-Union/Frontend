"use client";

import { cn } from "@/utils/cn";
import { useFormContext } from "react-hook-form";

interface StatusMessageProps {
  name: string;
  dirtyFields: Partial<Record<string, boolean>>;
  correctMessage?: string;
  className?: string;
}
const StatusMessage = ({
  name,
  correctMessage,
  dirtyFields,
  className,
}: StatusMessageProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  // 해당 필드 에러
  const fieldError = errors[name];

  // 상태 메세지 공통 스타일
  const statusMessageBaseStyle = `px-1 h-3 tb:h-3.5 px-[4px] typo-ui-xs-medium tb:typo-ui-sm-medium`;

  return (
    <>
      {fieldError ? (
        // 해당 field가 error state일 때 에러 메세지 노출
        <div className={cn("text-red-500", statusMessageBaseStyle, className)}>
          {fieldError.message?.toString()}
        </div>
      ) : (
        // 해당 field가 error state가 아닐 때 correctMessage가 있을 경우 correctMessage 노출
        correctMessage &&
        dirtyFields[name] && (
          <div
            className={cn(
              "text-gray-neutral-400",
              statusMessageBaseStyle,
              className
            )}
          >
            {correctMessage}
          </div>
        )
      )}
    </>
  );
};

export default StatusMessage;

// textarea일 경우 font size variant
// statusMessageVariants.textarea.<size | breakpoint_size>
export const statusMessageVariants = {
  textarea: {
    sm: "typo-ui-2xs-medium",
    tb_md: "tb:typo-ui-sm-medium",
  },
};
