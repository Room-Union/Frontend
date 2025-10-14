import { cn } from '@/utils/cn'

interface CarouselButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const CarouselButton = ({ className, children, ...props }: CarouselButtonProps) => {
  return (
    <button className={cn("size-15 p-[18px] rounded-full flex justify-center items-center border border-gray-neutral-200 bg-base-white-a-900 shadow-[0_3px_6px_0_rgba(0,0,0,0.10)] cursor-pointer hover:bg-gray-neutral-100 active:bg-gray-neutral-200 disabled:bg-base-white-a-900 disabled:cursor-not-allowed group", className)} {...props}>{children}</button>
  )
}

export default CarouselButton