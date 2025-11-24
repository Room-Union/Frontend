"use client";

import useCreateAppointment from "@/apis/appointments/mutation/use-create-appointment";
import { ModalWrapper } from "@/components/ui";
import AppointmentForm from "@/components/ui/modal/gathering/appointments/appointment-form";
import { APPOINTMENT_SUCCESS_MESSAGES } from "@/constants/success-message";
import { useToastStore } from "@/store/toast-store";
import { AppointmentFormInput } from "@/types/appointments";
import { formatDateTimeToISOString } from "@/utils/format-date";
import handleError from "@/utils/handle-error";
import { useState } from "react";

interface CreateAppointmentModalProps {
  trigger: React.ReactNode;
  meetingId: number;
}

const CreateAppointmentModal = ({
  trigger,
  meetingId,
}: CreateAppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToastStore();

  const { mutate: createAppointment } = useCreateAppointment();

  const handleSubmit = (formInput: AppointmentFormInput) => {
    const formData = formatDateTimeToISOString(formInput);

    createAppointment(
      { meetingId, data: formData },
      {
        onSuccess: () => {
          setOpen(false);
          toast(APPOINTMENT_SUCCESS_MESSAGES.CREATE);
        },
        onError: (error) => {
          handleError({ error, toast });
        },
      }
    );
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="모임 약속 생성"
      description="모임 약속을 생성하세요"
      trigger={trigger}
    >
      <AppointmentForm setOpen={setOpen} onSubmit={handleSubmit} />
    </ModalWrapper>
  );
};

export default CreateAppointmentModal;
