"use client";

import GatheringForm from "@/components/ui/modal/gathering/gathering-form";
import { GatheringFormData } from "@/types/gathering";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";
import { useState } from "react";

const GatheringModal = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data: GatheringFormData) => {
    // TODO: 폼 제출 로직
    console.log("Form submitted!", data);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Modal Trigger */}
      <Dialog.Trigger asChild>
        <button className="h-11 w-32 cursor-pointer bg-zinc-800 font-bold text-white">
          모임 만들기
        </button>
      </Dialog.Trigger>

      {/* Modal Portal */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[95vh] w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white">
          {/* description: VisuallyHidden는 스크린 리더의 접근을 허용, 화면에서는 숨겨줌 */}
          <VisuallyHidden>
            <Dialog.Title>모임 생성</Dialog.Title>
            <Dialog.Description>모임 생성 모달</Dialog.Description>
          </VisuallyHidden>

          {/* Modal Content */}
          <div className="flex h-full max-h-[90vh] w-full flex-col bg-white">
            {/* Modal Header Section */}
            <div className="flex flex-shrink-0 items-center justify-between bg-stone-50 px-8 py-6">
              <h2 className="text-2xl font-bold text-black">모임 생성</h2>
              <Dialog.Close asChild>
                <button className="cursor-pointer text-3xl text-stone-500 hover:text-stone-700">
                  x
                </button>
              </Dialog.Close>
            </div>

            {/* Form with Steps */}
            <GatheringForm onClose={handleClose} onSubmit={handleSubmit} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GatheringModal;
