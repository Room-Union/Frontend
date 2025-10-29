import { CategoryInput } from "@/components/ui";
import Label from "@/components/ui/input/label";

const CategoryStep = () => {
  return (
    <div>
      <div className="flex items-center pb-5">
        <Label
          htmlFor="category"
          text="이 모임은 어떤 종류인가요?"
          className="font-pretendard text-lg font-semibold tracking-tight"
          required={false}
        />
        <span className="font-pretendard text-lg font-medium tracking-tight text-blue-500">
          *
        </span>
      </div>
      <CategoryInput
        label=""
        name="category"
        type="checkbox"
        correctMessage="카테고리가 선택되었습니다."
        className="tb:grid-cols-3 grid-cols-2"
      />
    </div>
  );
};

export default CategoryStep;
