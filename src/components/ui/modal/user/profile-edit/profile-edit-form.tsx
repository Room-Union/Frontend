"use client";

import { Edit } from "@/assets/icons";
import SvgProfileF1 from "@/assets/icons-colored/profile-f1";
import CategoryInput from "@/components/ui/input/category-input";
import FileInput from "@/components/ui/input/file-input";
import GenderInput from "@/components/ui/input/gender-input";
import Input from "@/components/ui/input/Input";
import { FormProvider, useForm } from "react-hook-form"; // 추가
import ModalNav from "../../modal-nav";

interface ProfileEditFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void; // data 타입 추가
}

const ProfileEditForm = ({ onCancel, onSubmit }: ProfileEditFormProps) => {
  // useForm 추가
  const methods = useForm({
    mode: "onChange",
  });

  // handleSubmit 추가
  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <div className="relative">
              <SvgProfileF1 className="size-[114px]" />
              <FileInput
                name="image"
                previewClassName="size-[144px] rounded-lg"
                ButtonComponent={EditButton}
              />
            </div>
          </div>
          <Input name="name" label="닉네임" />
          <GenderInput className="text-gray-neutral-900 flex justify-center border px-6 py-[14px] font-['Pretendard'] text-base leading-none font-semibold" />
          <CategoryInput label="선호 카테고리 (2개)" />
        </div>
        <ModalNav onCancel={onCancel} onSubmit={handleSubmit} />
      </form>
    </FormProvider>
  );
};

export default ProfileEditForm;

const EditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick} // ✅ 추가
      className="absolute -right-[2px] -bottom-[5px] flex cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white p-2"
    >
      <Edit className="size-6 flex-shrink-0 text-slate-600" />
    </button>
  );
};
