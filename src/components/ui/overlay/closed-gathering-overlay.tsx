import { cn } from "@/utils/cn";

interface ClosedGatheringOverlayProps {
  className?: string;
}

const ClosedGatheringOverlay = ({ className }: ClosedGatheringOverlayProps) => {
  return (
    <div
      className={cn(
        "bg-base-black-a-600 text-base-white absolute inset-0 flex h-full w-full items-center justify-center rounded-[20px] text-center",
        "tb:font-bold mo:font-bold",
        "tb:leading-[24px] mo:leading-[16px]",
        "tb:tracking-[-0.6px] mo:tracking-[-0.16px]",
        "tb:[font-size:clamp(16px,8.73cqw,41px)] mo:[font-size:clamp(16px,8cqw,27px)]",
        className
      )}
    >
      마감된 모임이에요
    </div>
  );
};

export default ClosedGatheringOverlay;
