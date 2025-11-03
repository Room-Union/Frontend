import { CATEGORIES } from "@/constants/constants";
import type { CategoryType } from "@/types/constants";

export const getCategoryInfoData = (
  category: CategoryType | undefined
): { category: CategoryType; headerIcon: string; name: string } | null => {
  if (!category) return null;

  const categoryItem = CATEGORIES.find((item) => item.value === category);
  const headerIcon = categoryItem?.gatheringListHeaderIcon;
  const name = categoryItem?.name;

  return headerIcon && name ? { category, headerIcon, name } : null;
};
