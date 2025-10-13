"use client";
import { useState } from "react";
import ModalWrapper from "../../modal-wrapper";
import ProfileEditForm from "./profile-edit-form";

const ProfileEditModal = () => {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="프로필 수정하기"
      description="프로필 수정 모달"
      trigger={
        <button className="cursor-pointer bg-black px-[18px] py-2 text-white">
          내 프로필 수정
        </button>
      }
    >
      <ProfileEditForm onCancel={handleCancel} onSubmit={handleSubmit} />
    </ModalWrapper>
  );
};

export default ProfileEditModal;
