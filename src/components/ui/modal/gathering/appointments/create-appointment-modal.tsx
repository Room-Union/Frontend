"use client";

import useCreateAppointment from "@/apis/appointments/mutation/use-create-appointment";
import { ModalWrapper } from "@/components/ui";
import AppointmentForm from "@/components/ui/modal/gathering/appointments/appointment-form";
import {
  AppointmentFormData,
  AppointmentFormInput,
} from "@/types/appointments";
import { format } from "date-fns";
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

  const { mutate: createAppointment } = useCreateAppointment(setOpen);

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

    createAppointment({ meetingId, data: formData });
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
