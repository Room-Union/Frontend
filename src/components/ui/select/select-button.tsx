import { ArrowDown } from "@/assets/icons";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

const selectButtonIconVariants = cva(
  "group-hover:text-gray-neutral-600 group-disabled:text-gray-neutral-300",
  {
    variants: {
      size: {
        lg: "size-5 text-gray-neutral-900",
        md: "size-4 text-gray-neutral-600",
        sm: "size-[14px] text-gray-neutral-600",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const selectButtonVariants = cva(
  "group flex items-center cursor-pointer hover:bg-gray-neutral-100 hover:text-gray-neutral-600 disabled:text-gray-neutral-300 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        lg: "typo-ui-2xl-bold text-gray-neutral-900 active:text-gray-neutral-800 rounded-2xl px-3 py-2.25 gap-1.5 ",
        md: "typo-ui-md-medium text-gray-neutral-600 active:text-gray-neutral-800 rounded-xl px-3 py-2 gap-1",
        sm: "typo-ui-sm-medium text-gray-neutral-600 active:text-gray-neutral-800 rounded-xl px-3 py-2 gap-1",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

interface SelectButtonProps {
  children: string;
  open: boolean;
  size: "sm" | "md" | "lg";
  buttonClassName?: string;
  iconClassName?: string;
}

const SelectButton = ({
  children,
  open,
  size,
  buttonClassName,
  iconClassName,
}: SelectButtonProps) => {
  return (
    <div className={cn(selectButtonVariants({ size }), buttonClassName)}>
      {children}
      <ArrowDown
        className={cn(
          selectButtonIconVariants({ size }),
          iconClassName,
          open && "rotate-180"
        )}
      />
    </div>
  );
};

export default SelectButton;
