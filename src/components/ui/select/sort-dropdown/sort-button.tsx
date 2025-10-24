import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

interface SortButtonProps {
  children: string;
  size: "lg" | "md";
  className?: string;
}

const sortButtonVariants = cva(
  "flex items-center cursor-pointer text-gray-neutral-700",
  {
    variants: {
      size: {
        lg: "px-3 py-3.5 typo-ui-md-semibold",
        md: "px-1.5 py-3 typo-ui-sm-semibold",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const SortButton = ({ children, size, className }: SortButtonProps) => {
  return (
    <div className={cn(sortButtonVariants({ size }), className)}>
      {children}
    </div>
  );
};

export default SortButton;
