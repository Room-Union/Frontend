"use client";

import useCreateGathering from "@/apis/gathering/mutation/use-create-gathering";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { Plus, UsersThree } from "@/assets/icons";
import { Button, ModalWrapper } from "@/components/ui";
import GatheringForm from "@/components/ui/modal/gathering/form/gathering-form";
import { AUTH_MODAL_MESSAGES } from "@/constants/modal-message";
import { GATHERING_SUCCESS_MESSAGES } from "@/constants/success-message";
import { useModalStore } from "@/store/modal-store";
import { useToastStore } from "@/store/toast-store";
import { GatheringFormData, GatheringFormInput } from "@/types/gathering";
import handleError from "@/utils/handle-error";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateGathering = () => {
  const router = useRouter();
  const { toast } = useToastStore();
  const { alertModal } = useModalStore();

  const [open, setOpen] = useState(false);

  const { mutate: createGathering, isPending: isLoading } =
    useCreateGathering();
  const { data: user } = useGetUserInfo();
  const isSignedIn = !!user;

  const handleOpenChange = (open: boolean) => {
    if (open && !isSignedIn) {
      alertModal({
        ...AUTH_MODAL_MESSAGES.LOGIN_REQUIRED,
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
    const formData: GatheringFormData = {
      ...formInput,
      category: formInput.category[0], // category가 배열 형태로 반환되므로, 0번째 인덱스 사용
    };

    createGathering(formData, {
      onSuccess: (response) => {
        setOpen(false);
        toast(GATHERING_SUCCESS_MESSAGES.CREATE);
        router.push(`/gathering/detail/${response.meetingId}`);
      },
      onError: (error) => {
        handleError({ error, toast });
      },
    });
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={handleOpenChange}
      title="모임 생성"
      description="새로운 모임을 만들어보세요"
      className="mo:pt-8 mo:px-6"
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
