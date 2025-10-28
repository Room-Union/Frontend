"use client";

import { ModalWrapper } from "@/components/ui";
import AppointmentForm from "@/components/ui/modal/gathering/appointments/appointment-form";
import { useState } from "react";

interface CreateAppointmentModalProps {
  trigger: React.ReactNode;
}

const CreateAppointmentModal = ({ trigger }: CreateAppointmentModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="모임 약속 생성"
      description="모임 약속을 생성하세요"
      trigger={trigger}
    >
      <AppointmentForm setOpen={setOpen} />
    </ModalWrapper>
  );
};

export default CreateAppointmentModal;
