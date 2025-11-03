"use client";

import useEditUserInfo from "@/apis/user/mutation/use-edit-user-info";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { Input, Profile } from "@/components/ui";
import CategoryInput from "@/components/ui/input/category-input";
import GenderInput from "@/components/ui/input/gender-input";
import { useToastStore } from "@/store/toast-store";
import { editInfoSchema } from "@/validation/edit-info-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form"; // 추가
import ModalNav from "../../modal-nav";
import EditButton from "./profile-edit-button";

interface ProfileEditFormProps {
  setOpen: (open: boolean) => void;
}

const ProfileEditForm = ({ setOpen }: ProfileEditFormProps) => {
  const { data: userInfo, isPending, isError } = useGetUserInfo();
  const { mutate: editUserInfo, isPending: isEditUserInfoPending } =
    useEditUserInfo();
  const { toast } = useToastStore();
  const [imageFile, setImageFile] = useState<File | string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string>(
    userInfo?.profileImageUrl ?? ""
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: userInfo?.nickname ?? "",
      gender: userInfo?.gender ?? "FEMALE",
      categories: userInfo?.categories ?? [],
    },
    resolver: zodResolver(editInfoSchema),
  });

  const isValid = methods.formState.isValid;
  const isDirty = methods.formState.isDirty;

  const handleSubmit = methods.handleSubmit((data) => {
    if (isEditUserInfoPending) return;
    const payload = {
      profileImage: imageFile,
      ...data,
    };

    editUserInfo(payload, {
      onSuccess: () => {
        toast({
          type: "success",
          message: "프로필 수정이 완료되었습니다.",
        });
        setOpen(false);
      },
    });
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setProfileImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onCancel = () => {
    setOpen(false);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        className="tb:gap-8 mo:gap-5 scrollbar-hide flex flex-1 flex-col overflow-y-auto"
      >
        <div className="tb:gap-6 mo:gap-5 flex flex-col">
          <div className="flex justify-center">
            <div className="relative">
              <Profile profileImageUrl={profileImageUrl} size="lg" />
              <input
                type="file"
                id="profile-image-input"
                className="hidden"
                onChange={handleProfileImageChange}
                ref={fileInputRef}
                accept={ALLOWED_IMAGE_TYPES.join(",")}
              />
              <EditButton
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              />
            </div>
          </div>
          <Input name="nickname" label="닉네임" />
          <GenderInput />
          <CategoryInput label="선호 카테고리 (2개)" type="checkbox" />
        </div>
        <ModalNav
          onCancel={onCancel}
          onSubmit={handleSubmit}
          completeButtonText="수정 완료"
          disabled={!isValid || (!isDirty && !imageFile)}
          loading={isEditUserInfoPending}
        />
      </form>
    </FormProvider>
  );
};

export default ProfileEditForm;
