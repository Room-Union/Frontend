import type {
  CategoryDomainType,
  CategoryExtendsAllType,
} from "@/types/constants";

import type { SortDomainType, SortType } from "@/types/gathering-list";

const convertCategoryConstantToDomain = (
  categoryConstantType: CategoryExtendsAllType
): CategoryDomainType =>
  (categoryConstantType === "all"
    ? "all"
    : categoryConstantType
        .toLowerCase()
        .replace(/_/g, "-")) as CategoryDomainType;

const convertCategoryDomainToConstant = (
  categoryDomain: CategoryDomainType
): CategoryExtendsAllType =>
  (categoryDomain === "all"
    ? "all"
    : categoryDomain
        .toUpperCase()
        .replace(/-/g, "_")) as CategoryExtendsAllType;

const convertSortConstantToDomain = (sortConstant: SortType): SortDomainType =>
  sortConstant.toLowerCase().replace(/_/g, "-") as SortDomainType;

const convertSortDomainToConstant = (sortDomain: SortDomainType): SortType =>
  sortDomain.toUpperCase().replace(/-/g, "_") as SortType;

export {
  convertCategoryConstantToDomain,
  convertCategoryDomainToConstant,
  convertSortConstantToDomain,
  convertSortDomainToConstant,
};
