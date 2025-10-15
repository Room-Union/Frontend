import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { CATEGORIES } from "@/constants/constants";

interface CategoryProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof categoryBadgeVariants> {}

const categoryBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-md gap-[3px] whitespace-nowrap",
  {
    variants: {
      category: {
        CULTURE_ART: "bg-yellow-50 text-yellow-400",
        GAME: "bg-red-50 text-red-500",
        HOBBY: "bg-orange-100 text-orange-500",
        COMMUNICATION: "bg-blue-50 text-blue-500",
        INFO_ECONOMY: "bg-purple-100 text-purple-500",
        SELF_DEVELOPMENT: "bg-green-50 text-green-500",
      },
      size: {
        lg: "px-[8px] py-[6px] typo-ui-sm-medium tracking-[-0.14px]",
        sm: "px-[6px] py-[5px] typo-ui-2xs-bold tracking-[-0.3px]",
      },
    },
  }
);

const CategoryBadge = ({
  category,
  size,
  className,
  ...props
}: CategoryProps) => {
  const categoryInfo = CATEGORIES.find((item) => item.value === category);

  if (!categoryInfo) return null;

  return (
    <div
      className={cn(categoryBadgeVariants({ category, size }), className)}
      {...props}
    >
      {categoryInfo.icon?.("w-[1em] h-[1em]")}
      {categoryInfo.name}
    </div>
  );
};

export default CategoryBadge;
