import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn';
import { CATEGORIES } from '@/constants/constants';

interface CategoryProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof categoryBadgeVariants> {
  category: string;
};

const categoryBadgeVariants = cva(
  'inline-flex px-[8px] py-[6px] items-center justify-center rounded-md gap-[3px] tracking-[-0.14px] typo-ui-sm-medium whitespace-nowrap',
  {
    variants: {
      categoryVariants: {
        'CULTURE_ART': "bg-yellow-50 text-yellow-400",
        'GAME': "bg-red-50 text-red-500",
        'HOBBY': "bg-orange-100 text-orange-500",
        'COMMUNICATION': "bg-blue-50 text-blue-500",
        'INFO_ECONOMY': "bg-purple-100 text-purple-500",
        'SELF_DEVELOPMENT': "bg-green-50 text-green-500",
      },
    },
  }
);

const CategoryBadge = ({ category, className, ...props }: CategoryProps) => {
  const categoryInfo = CATEGORIES.find((item) => item.value === category);

  if (!categoryInfo) return null;

  return (
    <div className={cn(categoryBadgeVariants({ categoryVariants: categoryInfo.value as CategoryProps['categoryVariants'] }), className)} {...props}>
      {categoryInfo.icon && categoryInfo.icon ("w-[1em] h-[1em]")}
      {categoryInfo.name}
    </div>
  )
}

export default CategoryBadge;