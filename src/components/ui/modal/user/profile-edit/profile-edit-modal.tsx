"use client";
import Button from "@/components/ui/button/button";
import { useState } from "react";
import ModalWrapper from "../../modal-wrapper";
import ProfileEditForm from "./profile-edit-form";

const ProfileEditModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="프로필 수정하기"
      description="프로필 수정 모달"
      trigger={
        <Button
          variant="outline"
          size="sm"
          className="h-[38px] max-w-[109px] whitespace-nowrap"
        >
          내 프로필 수정
        </Button>
      }
    >
      <ProfileEditForm setOpen={setOpen} />
    </ModalWrapper>
  );
};

export default ProfileEditModal;
