import React from "react";
import { STATUS } from "@/constants/constants";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

interface StatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

const statusBadgeVariants = cva(
  "inline-flex px-[14px] py-[8px] items-center justify-center rounded-full gap-[8px] tracking-[-0.16px] typo-ui-md-medium whitespace-nowrap bg-base-black-a-700",
  {
    variants: {
      status: {
        RECRUITING: "text-base-white",
        NEW: "text-green-300",
        ALMOST_FULL: "text-red-400",
      },
    },
  }
);

const StatusBadge = ({ status, className, ...props }: StatusProps) => {
  const statusInfo = STATUS.find((item) => item.value === status);

  if (!statusInfo) return null;

  return (
    <div className={cn(statusBadgeVariants({ status }), className)} {...props}>
      {statusInfo.name}
    </div>
  );
};

export default StatusBadge;
