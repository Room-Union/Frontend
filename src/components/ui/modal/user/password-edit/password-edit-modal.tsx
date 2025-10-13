"use client";
import { useState } from "react";
import ModalWrapper from "../../modal-wrapper";
import PasswordEditForm from "./password-edit-form";

const PasswordEditModal = () => {
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
      title="비밀번호 변경"
      description="비밀번호 변경 모달"
      trigger={
        <button className="cursor-pointer bg-black px-[18px] py-2 text-white">
          비밀번호 변경
        </button>
      }
    >
      <PasswordEditForm onCancel={handleCancel} onSubmit={handleSubmit} />
    </ModalWrapper>
  );
};

export default PasswordEditModal;
