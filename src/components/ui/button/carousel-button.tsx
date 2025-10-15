import { cn } from "@/utils/cn";

interface CarouselButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const CarouselButton = ({
  className,
  children,
  ...props
}: CarouselButtonProps) => {
  return (
    <button
      className={cn(
        "border-gray-neutral-200 bg-base-white-a-900 hover:bg-gray-neutral-100 active:bg-gray-neutral-200 disabled:bg-base-white-a-900 group flex size-15 cursor-pointer items-center justify-center rounded-full border p-[18px] shadow-[0_3px_6px_0_rgba(0,0,0,0.10)] disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CarouselButton;
