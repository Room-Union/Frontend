import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn';
import ArtIcon from '@/assets/icons/art';
import GamesIcon from '@/assets/icons/game';
import HobbiesIcon from '@/assets/icons/sport';
import CommunicationsIcon from '@/assets/icons/chat';
import InformationEconomyIcon from '@/assets/icons/chart';
import SelfDevelopmentIcon from '@/assets/icons/study';

type CategoryProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof categoryBadgeVariants> & {
    category: string
  }

const CATEGORY = [
  { value: 'CULTURE_ART', name: '문화·예술', icon: ArtIcon },
  { value: 'GAME', name: '게임', icon: GamesIcon },
  { value: 'HOBBY', name: '취미', icon: HobbiesIcon },
  { value: 'COMMUNICATION', name: '소통', icon: CommunicationsIcon },
  { value: 'INFO_ECONOMY', name: '정보·경제', icon: InformationEconomyIcon },
  { value: 'SELF_DEVELOPMENT', name: '자기계발', icon: SelfDevelopmentIcon },
]

const categoryBadgeVariants = cva(
  'inline-flex px-[8px] py-[6px] items-center justify-center rounded-md gap-[3px] tracking-[-0.14px] font-Pretendard-Regular text-[14px] leading-none whitespace-nowrap',
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
  const categoryInfo = CATEGORY.find((item) => item.value === category);

  if (!categoryInfo) return null;

  const Icon = categoryInfo.icon;
  return (
    <div className={cn(categoryBadgeVariants({ categoryVariants: categoryInfo.value as CategoryProps['categoryVariants'] }), className)} {...props}>
      <Icon className="w-[1em] h-[1em] fill-current stroke-none" />
      {categoryInfo.name}
    </div>
  )
}

export default CategoryBadge;