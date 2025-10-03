import { CATEGORIES } from "@/constants/constants";
import OptionInput from "./option-input";

interface CategoryInputProps {
  label?: string | React.ReactNode;
  className?: string;
  type?: "radio" | "checkbox";
  correctMessage?: string;
}

const CategoryInput = ({
  label = "카테고리",
  type = "checkbox",
  correctMessage = "2개 선택 완료되었습니다.",
  className,
}: CategoryInputProps) => {
  const categoriesExceptAll = CATEGORIES.filter(
    (category) => category.value !== "all"
  );

  return (
    <OptionInput
      name="categories"
      options={categoriesExceptAll}
      type={type}
      label={label}
      className={className}
      correctMessage={correctMessage}
    />
  );
};

export default CategoryInput;
