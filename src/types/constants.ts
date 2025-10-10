interface OptionType {
  name: string;
  value: string;
  icon?: (props: string) => React.JSX.Element;
}

interface SignUpStepType {
  id: number;
  name: string;
}
