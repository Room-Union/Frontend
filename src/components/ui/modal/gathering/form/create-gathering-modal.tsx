"use client";

import useCreateGathering from "@/apis/gathering/mutation/use-create-gathering";
import { Plus, UsersThree } from "@/assets/icons";
import { Button, ModalWrapper } from "@/components/ui";
import GatheringForm from "@/components/ui/modal/gathering/form/gathering-form";
import { CategoryType } from "@/types/constants";
import { GatheringFormData } from "@/types/gathering";
import { useState } from "react";

const CreateGathering = () => {
  const [open, setOpen] = useState(false);
  const { mutate: createGathering, isPending: isLoading } =
    useCreateGathering();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (formData: GatheringFormData) => {
    // category가 배열 형태로 반환되므로, 0번째 인덱스 사용
    const processedData: GatheringFormData = {
      ...formData,
      category: formData.category[0] as CategoryType,
    };

    createGathering(processedData, {
      onSuccess: () => setOpen(false),
      onError: (error) => console.error(error),
    });
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="모임 만들기"
      description="새로운 모임을 만들어보세요"
      trigger={
        <Button
          size="pill_icon"
          variant="primary"
          className="fixed flex justify-between"
          disabled={isLoading}
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

export default CreateGathering;
