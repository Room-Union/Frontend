import { CategoryInput } from "@/components/ui";

const CategoryStep = () => {
  return (
    <div className="space-y-3">
      <CategoryInput
        type="checkbox"
        label="이 모임은 어떤 종류의 모임인가요?"
        correctMessage="1개 선택 완료되었습니다."
        className="w-full border-none bg-neutral-100 px-5 py-4 text-center text-neutral-500 outline-none"
      />
    </div>
  );
};

export default CategoryStep;
