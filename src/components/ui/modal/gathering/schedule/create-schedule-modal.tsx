"use client";

import { Plus } from "@/assets/icons";
import { Button, ModalWrapper } from "@/components/ui";
import ScheduleForm from "@/components/ui/modal/gathering/schedule/schedule-form";
import { useState } from "react";

const CreateScheduleModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="모임 약속 생성"
      description="모임 약속을 생성하세요"
      trigger={
        <Button variant="primary" size="pill_icon" className="gap-2.5">
          <Plus className="size-[22px] stroke-none" />
          <span className="typo-title-xs-semibold mo:block hidden">
            약속 생성
          </span>
        </Button>
      }
    >
      <ScheduleForm setOpen={setOpen} />
    </ModalWrapper>
  );
};

export default CreateScheduleModal;
