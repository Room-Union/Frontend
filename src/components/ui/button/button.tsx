import { Spinner } from "@/components/ui";
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
          "bg-white border border-gray-neutral-200 hover:bg-gray-neutral-100 text-gray-neutral-500 active:bg-gray-neutral-200 disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-neutral-300",
        outline:
          "bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-400 active:bg-blue-100 active:border-blue-700 active:text-blue-600 disabled:bg-gray-neutral-50 disabled:text-gray-neutral-300 disabled:border-gray-neutral-300 disabled:cursor-not-allowed",
        ghost:
          "bg-transparent text-gray-neutral-600 hover:text-gray-neutral-600 hover:bg-gray-neutral-50 active:bg-gray-neutral-100 active:text-gray-neutral-800 disabled:bg-transparent disabled:text-gray-neutral-300 disabled:cursor-not-allowed",
        underline: "underline text-gray-neutral-400",
        auth: "text-blue-600 underline",
      },
      size: {
        text: "tb:typo-ui-sm-medium typo-ui-xs-medium",
        lg: "typo-ui-xl-semibold py-4 px-[30px] rounded-2xl w-full max-w-[474px] h-[60px]",
        md: "typo-ui-md-semibold py-2 px-6 rounded-xl w-full max-w-[311px] h-[48px]",
        sm: "flex typo-ui-sm-semibold py-2.5 px-4 rounded-[10px] w-full max-w-[84px] h-[38px] items-center justify-center",
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
