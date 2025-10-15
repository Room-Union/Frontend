import React from "react";
import { STATUS } from "@/constants/constants";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

interface StatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

const statusBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full gap-[8px] whitespace-nowrap bg-base-black-a-700 absolute z-20",
  {
    variants: {
      status: {
        RECRUITING: "text-base-white",
        NEW: "text-green-300",
        ALMOST_FULL: "text-red-400",
      },
      size: {
        lg: "px-[14px] py-[8px] typo-ui-md-medium tracking-[-0.16px] top-[20px] right-[20px]",
        sm: "px-[10px] py-[6px] typo-ui-sm-medium tracking-[-0.35px] top-[14px] right-[14px] tb:px-[14px] tb:py-[8px] tb:typo-ui-md-medium tb:tracking-[-0.16px] tb:top-[20px] tb:right-[20px]",
      },
    },
  }
);

const StatusBadge = ({ status, size, className, ...props }: StatusProps) => {
  const statusInfo = STATUS.find((item) => item.value === status);

  if (!statusInfo) return null;

  return (
    <div
      className={cn(statusBadgeVariants({ status, size }), className)}
      {...props}
    >
      {statusInfo.name}
    </div>
  );
};

export default StatusBadge;
