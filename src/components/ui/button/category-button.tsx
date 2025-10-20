import { CATEGORIES_EXTENDS_ALL } from "@/constants/constants";
import { CategoryExtendsAllType } from "@/types/constants";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";

const categoryButtonVariants = cva(
  "group flex flex-col items-center justify-center cursor-pointer rounded-[14px] border border-transparent bg-gray-neutral-100 text-gray-neutral-500 hover:bg-base-white hover:border-base-black-a-700 active:bg-gray-neutral-200 aria-disabled:bg-gray-neutral-50 aria-disabled:text-gray-neutral-300 aria-disabled:pointer-events-none transition-colors",
  {
    variants: {
      size: {
        lg: "w-25 h-25 typo-ui-md-medium",
        md: "w-23 h-23 typo-ui-sm-medium",
        sm: "w-16 h-16 typo-ui-xs-medium",
      },
    },
  }
);

// 카테고리 아이콘 크기 맵
const iconVariantsMap = {
  lg: "w-[36px] h-[36px] pb-[10px]",
  md: "w-[32px] h-[32px] pb-[10px]",
  sm: "w-[24px] h-[24px] pb-[6px]",
} as const;

// 아이콘 크기 타입
type iconSizeType = keyof typeof iconVariantsMap;

interface CategoryButtonProps
  extends Omit<React.ComponentProps<typeof Link>, "href">,
    VariantProps<typeof categoryButtonVariants> {
  category: CategoryExtendsAllType;
  disabled?: boolean;
  className?: string;
}

const CategoryButton = ({
  category,
  size = "lg",
  disabled = false,
  className,
  ...props
}: CategoryButtonProps) => {
  const categoryInfo = CATEGORIES_EXTENDS_ALL.find(
    (item) => item.value === category
  );
  if (!categoryInfo) return null;

  // 아이콘 크기 설정
  const iconSize: iconSizeType = size as iconSizeType;

  // 카테고리 버튼 컨텐츠
  const CategoryButtonContent = () => {
    return (
      <>
        {categoryInfo.icon?.(
          `${iconVariantsMap[iconSize]} group-aria-disabled:fill-gray-neutral-300`
        )}
        {categoryInfo.name}
      </>
    );
  };

  return disabled ? (
    // disabled 일 때는 div로 렌더링
    <div
      className={cn(categoryButtonVariants({ size }), className)}
      aria-disabled={disabled}
      aria-label={`${categoryInfo.name} 카테고리 페이지로 이동`}
      tabIndex={-1}
    >
      <CategoryButtonContent />
    </div>
  ) : (
    // disabled 아닐 때는 Link로 렌더링
    <Link
      href={`/gathering/list/${categoryInfo.value}`}
      aria-label={`${categoryInfo.name} 카테고리 카테고리 페이지로 이동`}
      className={cn(categoryButtonVariants({ size }), className)}
      {...props}
    >
      <CategoryButtonContent />
    </Link>
  );
};

export default CategoryButton;
