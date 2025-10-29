import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

const progressVariants = cva("", {
  variants: {
    size: {
      sm: "h-[5px]",
      lg: "h-[10px]",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface ProgressProps {
  percent: number;
  size?: "sm" | "lg";
}

const Progress = ({ percent, size }: ProgressProps) => {
  return (
    <>
      <div
        className={cn(
          "bg-gray-neutral-200 w-full overflow-hidden rounded-full",
          progressVariants({ size })
        )}
      >
        <div
          className={cn(
            "w-full rounded-full bg-gradient-to-r from-[#49a3fd] to-[#79c7ff]",
            progressVariants({ size })
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </>
  );
};

export default Progress;
