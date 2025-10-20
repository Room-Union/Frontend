import { CategoryInput, GenderInput, Input } from "@/components/ui";
import { useFormButtonDisabled } from "@/hooks";
import FormContainer from "../form-container/form-container";
import FormFooter from "../form-container/form-footer";
import FormHeader from "../form-container/form-header";

interface ProfileEntryStep {
  onPrev: () => void;
}

const ProfileEntryStep = ({ onPrev }: ProfileEntryStep) => {
  const { isDisabled } = useFormButtonDisabled([
    "nickname",
    "categories",
    "gender",
  ]);
  return (
    // 사이즈 이슈 & 스크롤 처리로 인해 가려지는 부분이 많아 임의로 gap 조절
    <FormContainer className="tb:gap-[12px]">
      <FormHeader title="마지막으로, 정보를 입력해주세요" />

      <div className="tb:gap-[20px] scrollbar-hide flex w-full flex-col gap-[18px] overflow-y-auto px-[1px]">
        <Input
          name="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          correctMessage="사용 가능한 닉네임입니다"
        />
        {/* 스크롤 추가로 인한 width 및 padding 값 수정 */}
        <GenderInput className="w-[89px] px-[11px]" />
        <CategoryInput
          label="선호 카테고리(2개 필수)"
          className="tb:w-[137px] w-[89px]"
        />
      </div>

      <FormFooter
        text="가입 완료"
        type="submit"
        isDisabled={isDisabled}
        onPrev={onPrev}
      />
    </FormContainer>
  );
};

export default ProfileEntryStep;
