import { Delete } from "@/assets/icons";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";

interface ModalWrapperProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

const ModalWrapper = ({
  open,
  setOpen,
  trigger,
  title,
  description,
  children,
}: ModalWrapperProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Modal Trigger */}
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      {/* Modal Portal */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70" />
        <Dialog.Content className="tb:w-[544px] mo:w-[335px] tb:px-10 mo:px-5 tb:pt-10 mo:pt-5 tb:rounded-[36px] mo:rounded-[24px] fixed top-1/2 left-1/2 max-h-[95vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white">
          {/* description: VisuallyHidden는 스크린 리더의 접근을 허용, 화면에서는 숨겨줌 */}
          <VisuallyHidden>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
          </VisuallyHidden>

          {/* Modal Content */}
          <div className="tb:gap-[34px] mo:gap-6 flex h-full max-h-[90vh] flex-col bg-white">
            {/* Modal Header Section */}
            <div className="flex flex-shrink-0 items-center justify-between">
              <h2 className="tb:typo-title-sm-bold mo:typo-title-xs-bold text-black">
                {title}
              </h2>
              <Dialog.Close asChild>
                <button
                  className="flex size-6 cursor-pointer items-center justify-center rounded-sm text-slate-600 hover:text-slate-800 focus:outline-none"
                  aria-label="모달 닫기"
                >
                  <Delete className="size-6" />
                </button>
              </Dialog.Close>
            </div>

            {/* Modal Main Content */}
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalWrapper;
