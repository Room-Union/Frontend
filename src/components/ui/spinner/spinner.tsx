import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const spinnerVariants = cva("animate-spin rounded-full", {
  variants: {
    variant: {
      primary:
        "border-base-white-a-300 border-x-base-white-a-300 border-t-white",
      secondary:
        "border-gray-neutral-500-a-300 border-x-gray-neutral-500-a-300 border-t-gray-neutral-500",
      outline:
        "border-blue-500-a-300 border-x-blue-500-a-300 border-t-blue-500",
      ghost:
        "border-gray-neutral-700-a-300 border-x-gray-neutral-700-a-300 border-t-gray-neutral-700",
      underline: "border-transparent",
      auth: "border-transparent",
    },
    size: {
      sm: "size-4 border-2",
      md: "size-5 border-[2.5px]",
      lg: "size-6 border-[3px]",
      page: "size-10 border-[5px]",
      icon: "size-5 border-[3px]",
      pill: "size-5 border-[3px]",
      pill_icon: "size-5 border-[3px]",
      text: "size-4 border-2",
    },
  },
});

type SpinnerProps = VariantProps<typeof spinnerVariants>;

const Spinner = ({ variant, size }: SpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className={cn(spinnerVariants({ variant, size }))} />
    </div>
  );
};

export default Spinner;
