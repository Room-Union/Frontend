"use client";
import Button from "@/components/ui/button/button";
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
        <Button variant="outline" size="sm">
          내 프로필 수정
        </Button>
      }
    >
      <ProfileEditForm onCancel={handleCancel} onSubmit={handleSubmit} />
    </ModalWrapper>
  );
};

export default ProfileEditModal;
