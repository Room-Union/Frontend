"use client";

import { ModalWrapper } from "@/components/ui";
import GatheringForm from "@/components/ui/modal/gathering/gathering-form";
import { GatheringFormData } from "@/types/gathering";
import { useState } from "react";

const GatheringModal = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data: GatheringFormData) => {
    // TODO: 폼 제출 로직
    console.log("Form submitted!", data);
    setOpen(false);
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="모임 생성"
      description="모임 생성 모달"
      trigger={
        <button className="h-11 w-32 cursor-pointer bg-zinc-800 font-bold text-white">
          모임 만들기
        </button>
      }
    >
      <GatheringForm onClose={handleClose} onSubmit={handleSubmit} />
    </ModalWrapper>
  );
};

export default GatheringModal;
