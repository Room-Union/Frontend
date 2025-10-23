import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ComponentProps } from "react";

const buttonVariants = cva(
  "cursor-pointer text-center font-semibold transition-all",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed",
        secondary:
          "bg-white border border-gray-neutral-200 text-gray-neutral-500 disabled:cursor-not-allowed",
        outline:
          "bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-400 active:bg-blue-100 active:border-blue-700 active:text-blue-600 disabled:bg-gray-neutral-50 disabled:text-gray-neutral-300 disabled:border-gray-neutral-300 disabled:cursor-not-allowed",
        ghost:
          "bg-transparent text-gray-neutral-600 hover:text-gray-neutral-600 hover:bg-gray-neutral-50 active:bg-gray-neutral-100 active:text-gray-neutral-800 disabled:text-gray-neutral-300 disabled:cursor-not-allowed",
      },
      size: {
        lg: "typo-ui-xl-semibold py-4 px-[30px] rounded-2xl w-full max-w-[474px] h-[60px]",
        md: "typo-ui-md-semibold py-2 px-6 rounded-xl w-full max-w-[311px] h-[48px]",
        sm: "typo-ui-md-semibold py-3 px-4 rounded-[10px] h-[38px] leading-3.5 self-center",
        icon: "size-12 rounded-full flex items-center justify-center",
        pill: "typo-title-xs-semibold py-4 px-[22px] w-[167px] h-[56px] rounded-full disabled:shadow-[0px_3px_6.2px_0px_rgba(0,0,0,0.1)]",
        pill_icon:
          "tb:typo-title-xs-semibold tb:py-4 tb:px-[22px] tb:w-fit tb:h-[56px] rounded-full disabled:shadow-[0px_3px_6.2px_0px_rgba(0,0,0,0.1)] size-12 rounded-full flex items-center justify-center",
      },
      loading: {
        true: "pointer-events-none flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonVariant = VariantProps<typeof buttonVariants>;
type ButtonProps = ButtonVariant &
  (React.ButtonHTMLAttributes<HTMLButtonElement> | ComponentProps<typeof Link>);

const Button = ({
  variant,
  size,
  children,
  className,
  loading,
  ...props
}: ButtonProps) => {
  if ("href" in props) {
    return (
      <Link
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading ? <Spinner variant={variant} size={size} /> : children}
    </button>
  );
};

export default Button;

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
    },
    size: {
      sm: "size-4 border-2",
      md: "size-5 border-[2.5px]",
      lg: "size-6 border-[3px]",
      icon: "size-5 border-[3px]",
      pill: "size-5 border-[3px]",
      pill_icon: "size-5 border-[3px]",
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
