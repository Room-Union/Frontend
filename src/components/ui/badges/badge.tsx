import { Badges } from "@/constants/constants";
import { BadgeType } from "@/types/constants";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof BadgeVariants> {}

const BadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full gap-[8px] whitespace-nowrap bg-base-black-a-700 tb:typo-ui-md-medium tb:tracking-[-0.16px] tb:px-[14px] tb:py-[8px]",
  {
    variants: {
      status: {
        RECRUITING: "text-base-white",
        NEW: "text-green-300",
        ALMOST_FULL: "text-red-400",
      },
      size: {
        lg: "px-[14px] py-[8px] typo-ui-md-medium tracking-[-0.16px]",
        sm: "px-[10px] py-[6px] typo-ui-sm-medium tracking-[-0.35px] top-[14px] right-[14px]",
      },
    },
  }
);

const Badge = ({ status, size, className, ...props }: BadgeProps) => {
  const badgeInfo = Badges.find((item) => item.value === status);

  if (!badgeInfo) return null;

  return (
    <div className={cn(BadgeVariants({ status, size }), className)} {...props}>
      {badgeInfo?.name}
    </div>
  );
};

const BadgeList = ({ badges }: { badges: BadgeType[] }) => {
  return (
    <div className="tb:gap-[8px] mo:gap-[6px] flex flex-row">
      {badges.map((badge) => (
        <Badge key={badge} status={badge} size="sm" />
      ))}
    </div>
  );
};

export default BadgeList;
