"use client";

import useUpdateAppointment from "@/apis/appointments/mutation/use-update-appointment";
import { ModalWrapper } from "@/components/ui";
import AppointmentForm from "@/components/ui/modal/gathering/appointments/appointment-form";
import { APPOINTMENT_SUCCESS_MESSAGES } from "@/constants/success-message";
import { useToastStore } from "@/store/toast-store";
import {
  AppointmentFormInput,
  GetAppointmentResponse,
} from "@/types/appointments";
import { formatDateTimeToISOString } from "@/utils/format-date";
import handleError from "@/utils/handle-error";
import { useState } from "react";

interface UpdateAppointmentModalProps {
  trigger: React.ReactNode;
  meetingId: number;
  data: GetAppointmentResponse;
}

const UpdateAppointmentModal = ({
  trigger,
  meetingId,
  data,
}: UpdateAppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToastStore();
  const { mutate: updateAppointment } = useUpdateAppointment();

  const defaultValues: AppointmentFormInput = {
    title: data.title,
    maxMemberCount: data.maxMemberCount,
    date: new Date(data.scheduledAt),
    time: {
      hour: new Date(data.scheduledAt).getHours(),
      minutes: new Date(data.scheduledAt).getMinutes(),
    },
    image: data.imageUrl,
  };

  const handleSubmit = (formInput: AppointmentFormInput) => {
    const formData = formatDateTimeToISOString(formInput);

    updateAppointment(
      { meetingId, appointmentId: data.id, data: formData },
      {
        onSuccess: () => {
          setOpen(false);
          toast(APPOINTMENT_SUCCESS_MESSAGES.UPDATE);
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
      title="모임 약속 수정"
      description="모임 약속을 수정하세요"
      trigger={trigger}
    >
      <AppointmentForm
        setOpen={setOpen}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
    </ModalWrapper>
  );
};

export default UpdateAppointmentModal;
