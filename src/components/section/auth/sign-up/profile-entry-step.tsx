import { CategoryInput, GenderInput, Input } from "@/components/ui";
import FormContainer from "../form-container/form-container";
import FormFooter from "../form-container/form-footer";
import FormHeader from "../form-container/form-header";

interface ProfileEntryStep {
  onPrev: () => void;
  isPending: boolean;
}

const ProfileEntryStep = ({ onPrev, isPending }: ProfileEntryStep) => {
  return (
    <FormContainer>
      <FormHeader title="마지막으로, 정보를 입력해주세요" />
      <div className="tb:gap-[20px] flex w-full flex-col gap-[18px]">
        <Input
          name="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          correctMessage="사용 가능한 닉네임입니다"
        />
        <GenderInput />
        <CategoryInput label="선호 카테고리(2개 필수)" correctMessage="" />
      </div>
      <FormFooter
        text="가입 완료"
        type="submit"
        isPending={isPending}
        onPrev={onPrev}
        fields={["gender", "nickname", "categories"]}
      />
    </FormContainer>
  );
};

export default ProfileEntryStep;
