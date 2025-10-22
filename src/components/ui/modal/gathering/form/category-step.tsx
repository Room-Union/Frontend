import { CategoryInput } from "@/components/ui";
import Label from "@/components/ui/input/label";

const CategoryStep = () => {
  return (
    <div>
      <div className="flex items-center pb-5">
        <Label
          htmlFor="category"
          text="이 모임은 어떤 종류인가요?"
          className="font-[Pretendard] text-lg font-semibold tracking-tight"
          required={false}
        />
        <span className="font-[Pretendard] text-lg font-medium tracking-tight text-blue-500">
          *
        </span>
      </div>
      <CategoryInput
        label=""
        name="category"
        type="checkbox"
        correctMessage="카테고리가 선택되었습니다."
        className="tb:w-[139px] tb:font-semibold w-[144px] gap-2.5 text-[16px] font-semibold peer-checked:text-[16px] peer-checked:font-semibold"
      />
    </div>
  );
};

export default CategoryStep;
