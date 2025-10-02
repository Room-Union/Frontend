import { GENDER } from "@/constants/constants";
import OptionInput from "./option-input";

interface GenderInputProps {
  label?: string | React.ReactNode;
  className?: string;
}

const GenderInput = ({ label = "성별", className }: GenderInputProps) => {
  return (
    <OptionInput
      name="gender"
      type="radio"
      options={GENDER}
      label={label}
      className={className}
    />
  );
};

export default GenderInput;
