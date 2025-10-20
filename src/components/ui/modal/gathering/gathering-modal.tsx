"use client";

import { createGathering } from "@/apis/gathering/gathering.api";
import { Plus, UsersThree } from "@/assets/icons";
import { Button, ModalWrapper } from "@/components/ui";
import GatheringForm from "@/components/ui/modal/gathering/gathering-form";
import { CategoryType } from "@/types/constants";
import { GatheringFormData } from "@/types/gathering";
import { useState } from "react";

const GatheringModal = () => {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (data: GatheringFormData) => {
    console.log(data);

    try {
      const formData: GatheringFormData = {
        ...data,
        // category가 배열 형태로 반환되므로, 0번째 인덱스 사용
        category: (Array.isArray(data.category)
          ? data.category[0]
          : data.category) as CategoryType,
      };

      const response = await createGathering(formData);
      console.log(response);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="모임 만들기"
      description="모임 만들기 모달 트리거"
      trigger={
        <Button
          size="pill_icon"
          variant="primary"
          className="fixed flex justify-between"
        >
          <Plus className="mo:hidden size-6 stroke-none" />

          <UsersThree className="mo:size-6 mo:block hidden stroke-none" />
          <span className="typo-title-xs-semibold mo:block hidden">
            모임 만들기
          </span>
        </Button>
      }
    >
      <GatheringForm onCancel={handleCancel} onSubmit={handleSubmit} />
    </ModalWrapper>
  );
};

export default GatheringModal;
