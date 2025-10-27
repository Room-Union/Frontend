interface OptionType {
  name: string;
  value: string;
  gatheringListHeaderIcon?: string;
  icon?: (props: string) => React.JSX.Element;
}

interface SignUpStepType {
  id: number;
  name: string;
  value: string;
}

type GenderType = "MALE" | "FEMALE" | "NONE";

type CategoryType =
  | "CULTURE_ART"
  | "GAME"
  | "HOBBY"
  | "COMMUNICATION"
  | "INFO_ECONOMY"
  | "SELF_DEVELOPMENT";

type CategoryExtendsAllType = CategoryType | "all";

type BadgeType = "RECRUITING" | "NEW" | "ALMOST_FULL";

export type {
  BadgeType,
  CategoryExtendsAllType,
  CategoryType,
  GenderType,
  OptionType,
  SignUpStepType,
};
