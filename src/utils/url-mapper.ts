import type {
  CategoryDomainType,
  CategoryExtendsAllType,
} from "@/types/constants";

import type { SortDomainType, SortType } from "@/types/gathering-list";

// 카테고리 Constant를 Domain으로 변환
const convertCategoryConstantToDomain = (
  categoryConstantType: CategoryExtendsAllType
): CategoryDomainType =>
  (categoryConstantType === "all"
    ? "all"
    : categoryConstantType
        .toLowerCase()
        .replace(/_/g, "-")) as CategoryDomainType;

// 카테고리 Domain을 Constant로 변환
const convertCategoryDomainToConstant = (
  categoryDomain: CategoryDomainType
): CategoryExtendsAllType =>
  (categoryDomain === "all"
    ? "all"
    : categoryDomain
        .toUpperCase()
        .replace(/-/g, "_")) as CategoryExtendsAllType;

// 정렬 Constant를 Domain으로 변환
const convertSortConstantToDomain = (sortConstant: SortType): SortDomainType =>
  sortConstant.toLowerCase().replace(/_/g, "-") as SortDomainType;

// 정렬 Domain을 Constant로 변환
const convertSortDomainToConstant = (sortDomain: SortDomainType): SortType =>
  sortDomain.toUpperCase().replace(/-/g, "_") as SortType;

export {
  convertCategoryConstantToDomain,
  convertCategoryDomainToConstant,
  convertSortConstantToDomain,
  convertSortDomainToConstant,
};
