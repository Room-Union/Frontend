import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

const textVariants = cva("", {
  variants: {
    variant: {
      blue: "text-blue-500",
      "neutral-400": "text-neutral-400",
      "neutral-500": "text-neutral-500",
    },
    size: {
      xs: "typo-ui-xs-semibold",
      sm: "typo-ui-sm-semibold",
      md: "typo-ui-sm-semibold",
      lg: "typo-ui-md-medium",
    },
  },
});

interface MemberCountProps {
  current: number;
  max: number;
  size: "xs" | "sm" | "md" | "lg";
  currentVariant?: "blue" | "neutral-400" | "neutral-500";
  otherVariant?: "neutral-400" | "neutral-500";
  className?: string;
}

const MemberCount = ({
  current,
  max,
  size,
  currentVariant = "blue",
  otherVariant = "neutral-400",
  className,
}: MemberCountProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <span className={textVariants({ size, variant: currentVariant })}>
        {current}
      </span>
      <span className={textVariants({ size, variant: otherVariant })}>/</span>
      <span className={textVariants({ size, variant: otherVariant })}>
        {max}
      </span>
    </div>
  );
};

export default MemberCount;
