import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

const backgroundVariants = cva("h-[5px] bg-gray-neutral-200 rounded-full", {
  variants: {
    size: {
      sm: "w-[101px]",
      lg: "w-[142px]",
    },
  },
});

const progressVariants = cva("h-[5px] rounded-full", {
  variants: {
    color: {
      blue: "bg-gradient-to-r to-[#79c7ff] from-[#49a3fd]",
    },
    size: {
      sm: "max-w-[101px]",
      lg: "max-w-[142px]",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

interface ProgressProps {
  size: "sm" | "lg";
  color?: "blue";
  percent: number;
}

const Progress = ({ size, color, percent }: ProgressProps) => {
  return (
    <div className={cn(backgroundVariants({ size }))}>
      <div
        className={cn(progressVariants({ size, color }))}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default Progress;
