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
        <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[95vh] w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[36px] bg-white p-10">
          {/* description: VisuallyHidden는 스크린 리더의 접근을 허용, 화면에서는 숨겨줌 */}
          <VisuallyHidden>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
          </VisuallyHidden>

          {/* Modal Content */}
          <div className="flex h-full max-h-[90vh] w-full flex-col bg-white">
            {/* Modal Header Section */}
            <div className="flex flex-shrink-0 items-center justify-between pb-[34px]">
              <h2 className="text-2xl font-bold text-black">{title}</h2>
              <Dialog.Close asChild>
                <button className="cursor-pointer p-[6px] text-3xl text-stone-500 hover:text-stone-700">
                  <Delete className="size-4 text-slate-600" />
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
