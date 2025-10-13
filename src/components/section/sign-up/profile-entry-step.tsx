import { CategoryInput, GenderInput, Input } from "@/components/ui";
import { useFormButtonDisabled } from "@/hooks";
import { ProfileEntrySchemaType } from "@/validation/sign-up-validation";

const ProfileEntryStep = () => {
  const { isDisabled } = useFormButtonDisabled<ProfileEntrySchemaType>([
    "nickname",
    "categories",
    "gender",
  ]);
  return (
    <section className="flex flex-col gap-2">
      <h3 className="mx-auto text-lg">비밀번호를 입력해주세요</h3>

      <Input
        name="nickname"
        label="닉네임"
        correctMessage="사용 가능한 닉네임입니다."
        className="h-[60px] w-full rounded-md border p-2 outline-none"
      />

      <GenderInput className="flex h-[60px] w-full items-center justify-center rounded-md border p-2 outline-none has-checked:border-2" />

      <CategoryInput
        label="선호 카테고리(2개)"
        className="flex h-[60px] w-full items-center justify-center rounded-md border p-2 outline-none has-checked:border-2"
      />
      <button
        type="submit"
        className="h-[60px] w-[570px] rounded-md bg-black p-2 text-white disabled:bg-gray-300"
        disabled={isDisabled}
      >
        가입완료
      </button>
    </section>
  );
};

export default ProfileEntryStep;
