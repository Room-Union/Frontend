"use client";

import useCreateGathering from "@/apis/gathering/mutation/use-create-gathering";
import { Plus, UsersThree } from "@/assets/icons";
import { Button, ModalWrapper } from "@/components/ui";
import GatheringForm from "@/components/ui/modal/gathering/form/gathering-form";
import { useModalStore } from "@/store/modal-store";
import { GatheringFormData, GatheringFormInput } from "@/types/gathering";
import { checkIsSignedIn } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateGathering = () => {
  const router = useRouter();
  const { alertModal } = useModalStore();

  const [open, setOpen] = useState(false);

  const { mutate: createGathering, isPending: isLoading } =
    useCreateGathering();

  const handleOpenChange = (open: boolean) => {
    // 모달을 열려고 할 때 로그인 체크
    if (open && !checkIsSignedIn()) {
      alertModal({
        message: "로그인이 필요한 서비스입니다.",
        confirmText: "로그인",
        cancelText: "취소",
        onConfirm: () => {
          router.push("/sign-in");
        },
      });
      return;
    }
    setOpen(open);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (formInput: GatheringFormInput) => {
    // category가 배열 형태로 반환되므로, 0번째 인덱스 사용

    const formData: GatheringFormData = {
      ...formInput,
      category: formInput.category[0],
    };

    createGathering(formData, {});
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={handleOpenChange}
      title="모임 생성"
      description="새로운 모임을 만들어보세요"
      trigger={
        <Button
          size="pill_icon"
          variant="primary"
          className="tb:justify-between tb:gap-2.5 flex justify-center"
          disabled={isLoading}
        >
          <Plus className="tb:hidden size-6 stroke-none" />
          <UsersThree className="tb:size-6 tb:block hidden stroke-none" />
          <span className="typo-title-xs-semibold tb:block hidden">
            모임 생성
          </span>
        </Button>
      }
    >
      <GatheringForm onCancel={handleCancel} onSubmit={handleSubmit} />
    </ModalWrapper>
  );
};

export default CreateGathering;
