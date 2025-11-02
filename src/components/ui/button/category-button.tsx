import { CATEGORIES_EXTENDS_ALL } from "@/constants/constants";
import { CategoryExtendsAllType } from "@/types/constants";
import { cn } from "@/utils/cn";
import { convertCategoryConstantToDomain } from "@/utils/url-mapper";
import Link from "next/link";

interface CategoryButtonProps {
  category: CategoryExtendsAllType;
  disabled?: boolean;
  className?: string;
}

const CategoryButton = ({
  category,
  disabled = false,
  className,
  ...props
}: CategoryButtonProps) => {
  const categoryInfo = CATEGORIES_EXTENDS_ALL.find(
    (item) => item.value === category
  );
  if (!categoryInfo) return null;

  const categoryDomain = convertCategoryConstantToDomain(
    categoryInfo.value as CategoryExtendsAllType
  );

  // 카테고리 버튼 컨텐츠
  const CategoryButtonContent = () => {
    return (
      <>
        {categoryInfo.icon?.(
          "mo:w-[24px] mo:h-[24px] mo:pb-[6px] tb:w-[32px] tb:h-[32px] tb:pb-[10px] pc:w-[36px] pc:h-[36px] pc:pb-[10px] group-aria-disabled:fill-gray-neutral-300"
        )}
        {categoryInfo.name}
      </>
    );
  };

  return disabled ? (
    // disabled 일 때는 div로 렌더링
    <div
      className={cn(
        "group bg-gray-neutral-100 text-gray-neutral-500 hover:bg-base-neutral-50 hover:ring-base-black-a-600 active:bg-gray-neutral-200 aria-disabled:bg-gray-neutral-100 aria-disabled:text-gray-neutral-300 pc:typo-ui-md-medium tb:typo-ui-sm-medium mo:typo-ui-xs-medium flex aspect-square cursor-pointer flex-col items-center justify-center rounded-[14px] py-[10px] transition-colors hover:ring-2 aria-disabled:pointer-events-none",
        "tb:w-full tb:max-w-none pc:max-w-25",
        className
      )}
      aria-disabled={disabled}
      aria-label={`${categoryInfo.name} 카테고리 페이지로 이동`}
      tabIndex={-1}
    >
      <CategoryButtonContent />
    </div>
  ) : (
    // disabled 아닐 때는 Link로 렌더링
    <Link
      href={{
        pathname: "/gathering/list",
        query: {
          category: categoryDomain,
          sort: "latest",
        },
      }}
      aria-label={`${categoryInfo.name} 카테고리 페이지로 이동`}
      className={cn(
        "group bg-gray-neutral-100 text-gray-neutral-500 hover:bg-base-neutral-50 hover:ring-base-black-a-600 active:bg-gray-neutral-200 aria-disabled:bg-gray-neutral-100 aria-disabled:text-gray-neutral-300 pc:typo-ui-md-medium tb:typo-ui-sm-medium mo:typo-ui-xs-medium flex aspect-square cursor-pointer flex-col items-center justify-center rounded-[14px] py-[10px] transition-colors hover:ring-2 aria-disabled:pointer-events-none",
        "tb:w-full tb:max-w-none pc:max-w-25",
        className
      )}
      {...props}
    >
      <CategoryButtonContent />
    </Link>
  );
};

export default CategoryButton;
