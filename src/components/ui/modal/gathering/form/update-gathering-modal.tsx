"use client";

import useUpdateGathering from "@/apis/gathering/mutation/use-update-gathering";
import { Button, ModalWrapper } from "@/components/ui";
import GatheringForm from "@/components/ui/modal/gathering/form/gathering-form";
import {
  GatheringFormData,
  GatheringFormInput,
  GetGatheringDetailResponse,
} from "@/types/gathering";
import { useState } from "react";

interface UpdateGatheringModalProps {
  meetingId: number;
  data: GetGatheringDetailResponse;
}

// Todo: meetingId를 data.meetingId로 변경가능한가? -> 가능 시 리팩토링
const UpdateGatheringModal = ({
  meetingId,
  data,
}: UpdateGatheringModalProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: updateGathering, isPending } = useUpdateGathering();

  // DB에서 받은 값들을 폼에 맞게 변환
  const defaultValues: GatheringFormInput = {
    name: data.name,
    description: data.description,
    category: [data.category],
    maxMemberCount: data.maxMemberCount,
    platformURL: data.platformURL,
    meetingImage: data.meetingImage,
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (formInput: GatheringFormInput) => {
    const isDeleted = formInput.meetingImage === undefined;

    const formData: GatheringFormData = {
      ...formInput,
      category: formInput.category[0],
      ...(isDeleted && { removeImageUrl: data.meetingImage }), // 기존 이미지 삭제
    };

    updateGathering({ meetingId, data: formData }, {});
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="모임 수정"
      description="모임 정보를 수정해보세요"
      trigger={
        <Button
          type="button"
          variant="primary"
          size="md"
          className="tb:h-[60px] tb:rounded-2xl tb:px-[30px] tb:py-4 tb:text-xl max-w-none"
          disabled={isPending}
        >
          모임 수정
        </Button>
      }
    >
      <GatheringForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
    </ModalWrapper>
  );
};

export default UpdateGatheringModal;
