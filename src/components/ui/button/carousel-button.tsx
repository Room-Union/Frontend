import { cn } from "@/utils/cn";

interface CarouselButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const CarouselButton = ({
  className,
  children,
  ...props
}: CarouselButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "ring-gray-neutral-200 bg-base-white-a-900 hover:bg-gray-neutral-100 active:bg-gray-neutral-200 disabled:bg-base-white-a-900 group z-20 flex size-[40px] cursor-pointer items-center justify-center rounded-full p-[10px] shadow-[0_3px_6px_0_rgba(0,0,0,0.10)] ring-1 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CarouselButton;
