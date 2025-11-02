"use client";

import useUpdateAppointment from "@/apis/appointments/mutation/use-update-appointment";
import { ModalWrapper } from "@/components/ui";
import AppointmentForm from "@/components/ui/modal/gathering/appointments/appointment-form";
import {
  AppointmentFormData,
  AppointmentFormInput,
  GetAppointmentResponse,
} from "@/types/appointments";
import { format } from "date-fns";
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
    const date = new Date(formInput.date);
    const time = formInput.time;

    date.setHours(time.hour, time.minutes, 0, 0);

    // DB에 저장되는 형식: yyyy-MM-ddTHH:mm
    const scheduledAt = format(date, "yyyy-MM-dd'T'HH:mm");

    const formData: AppointmentFormData = {
      title: formInput.title,
      maxMemberCount: formInput.maxMemberCount,
      image: formInput.image,
      scheduledAt,
    };

    updateAppointment(
      { meetingId, appointmentId: data.id, data: formData },
      {
        onSuccess: () => {
          setOpen(false);
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
