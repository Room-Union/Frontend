"use client";

import useCreateGathering from "@/apis/gathering/mutation/use-create-gathering";
import useUpdateGathering from "@/apis/gathering/mutation/use-update-gathering";
import { Plus, UsersThree } from "@/assets/icons";
import { Button, ModalWrapper } from "@/components/ui";
import GatheringForm from "@/components/ui/modal/gathering/form/gathering-form";
import { CategoryType } from "@/types/constants";
import {
  GatheringFormData,
  GetGatheringDetailResponse,
} from "@/types/gathering";
import { useState } from "react";

interface GatheringModalProps {
  type: "create" | "update";
  meetingId?: number;
  data?: GetGatheringDetailResponse;
  trigger?: React.ReactNode;
}

const GatheringModal = ({
  type,
  meetingId,
  data,
  trigger,
}: GatheringModalProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: createGathering, isPending: isCreating } =
    useCreateGathering();
  const { mutate: updateGathering, isPending: isUpdating } =
    useUpdateGathering();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (formData: GatheringFormData) => {
    // category가 배열 형태로 반환되므로, 0번째 인덱스 사용
    const processedData: GatheringFormData = {
      ...formData,
      category: formData.category[0] as CategoryType,
    };

    if (type === "create") {
      createGathering(processedData, {
        onSuccess: () => setOpen(false),
        onError: (error) => console.error(error),
      });
    } else if (type === "update" && meetingId) {
      updateGathering(
        { meetingId, data: processedData },
        {
          onSuccess: () => setOpen(false),
          onError: (error) => console.error(error),
        }
      );
    }
  };

  const isLoading = isCreating || isUpdating;
  const modalTitle = type === "create" ? "모임 만들기" : "모임 수정하기";
  const modalDescription =
    type === "create"
      ? "새로운 모임을 만들어보세요"
      : "모임 정보를 수정해보세요";

  const defaultTrigger =
    type === "create" ? (
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
    ) : (
      <Button
        type="button"
        variant="primary"
        size="md"
        className="tb:h-[60px] tb:rounded-2xl tb:px-[30px] tb:py-4 tb:text-xl mt-[10px] max-w-none"
        disabled={isLoading}
      >
        모임 수정하기
      </Button>
    );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title={modalTitle}
      description={modalDescription}
      trigger={trigger || defaultTrigger}
    >
      <GatheringForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        defaultValues={data}
      />
    </ModalWrapper>
  );
};

export default GatheringModal;
