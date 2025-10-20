"use client";
import Button from "@/components/ui/button/button";
import { useState } from "react";
import ModalWrapper from "../../modal-wrapper";
import PasswordEditForm from "./password-edit-form";

const PasswordEditModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="비밀번호 변경"
      description="비밀번호 변경 모달"
      trigger={
        <Button variant="outline" size="sm">
          비밀번호 변경
        </Button>
      }
    >
      <PasswordEditForm setOpen={setOpen} />
    </ModalWrapper>
  );
};

export default PasswordEditModal;
