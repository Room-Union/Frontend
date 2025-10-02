import { CATEGORIES } from "@/constants/constants";
import OptionInput from "./OptionInput";

interface CategoryInputProps {
  label?: string | React.ReactNode;
  className?: string;
}

const CategoryInput = ({
  label = "카테고리",
  className,
}: CategoryInputProps) => {
  return (
    <OptionInput
      name="categories"
      options={CATEGORIES}
      label={label}
      className={className}
      correctMessage="2개 선택 완료되었습니다."
    />
  );
};

export default CategoryInput;
