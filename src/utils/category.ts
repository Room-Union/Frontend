import { CATEGORIES } from "@/constants/constants";

export const getCategoryInfo = (category: string) => {
  return [
    CATEGORIES.find((item) => item.value === category)?.gatheringListHeaderIcon,
    CATEGORIES.find((item) => item.value === category)?.name,
  ];
};
