import { CATEGORIES } from "@/constants/constants";

export const getCategoryName = (category: string) => {
  return CATEGORIES.find((item) => item.value === category)?.name;
};
