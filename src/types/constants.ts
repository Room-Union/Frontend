interface OptionType {
  name: string;
  value: string;
  icon?: (props: string) => React.JSX.Element;
}

interface SignUpStepType {
  id: number;
  name: string;
  value: string;
}

type CategoryType =
  | "all"
  | "CULTURE_ART"
  | "GAME"
  | "HOBBY"
  | "COMMUNICATION"
  | "INFO_ECONOMY"
  | "SELF_DEVELOPMENT";

type StatusType = 'RECRUITING' | 'NEW' | 'ALMOST_FULL';

export type { CategoryType, OptionType, SignUpStepType, StatusType };
