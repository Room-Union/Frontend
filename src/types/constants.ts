interface OptionType {
  name: string;
  value: string;
  icon?: (props: string) => React.JSX.Element;
}

interface SignUpStepType {
  id: number;
  name: string;
}

type CategoryType =
  'CULTURE_ART' | 'GAME' | 'HOBBY' | 'COMMUNICATION' | 'INFO_ECONOMY' | 'SELF_DEVELOPMENT';

type StatusType = 'recruiting' | 'new' | 'almostFull';

export type {
  OptionType,
  SignUpStepType,
  CategoryType,
  StatusType,
};