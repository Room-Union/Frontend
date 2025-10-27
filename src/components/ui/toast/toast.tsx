"use client";

import { AlertCircle, Party } from "@/assets/icons-colored";
import { useToastStore } from "@/store/toast-store";
import { cn } from "@/utils/cn";
import * as Toast from "@radix-ui/react-toast";
import { useEffect } from "react";

const ToastComponent = () => {
  const { toastOptions, removeToast } = useToastStore();

  useEffect(() => {
    toastOptions.forEach((toast) => {
      const timer = setTimeout(() => {
        const toastEl = document.getElementById(toast.id);
        if (toastEl) {
          toastEl.setAttribute("data-state", "closed");
        }
        setTimeout(() => {
          removeToast(toast.id);
        }, 200);
      }, toast.duration || 2000);

      return () => clearTimeout(timer);
    });
  }, [toastOptions, removeToast]);

  const toastIcon = {
    success: <Party className="tb:size-12.5 mo:size-9.5" />,
    error: <AlertCircle className="tb:size-7 mo:size-6" />,
  };

  return (
    <Toast.Provider>
      {toastOptions.map((option) => (
        <Toast.Root
          key={option.id}
          id={option.id}
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setTimeout(() => removeToast(option.id), 200);
            }
          }}
          className={cn(
            "bg-base-black-a-900",
            "tb:rounded-[20px] mo:rounded-2xl mo:px-6 mo:py-5 tb:px-6 tb:py-6 tb:gap-3 mo:gap-2.5 mb-1 flex min-w-73 flex-col items-center justify-center",
            "data-[state=open]:animate-slideInUp",
            "data-[state=closed]:animate-slideOutDown",
            "data-[swipe=move]:translate-y-[var(--radix-toast-swipe-move-y)]",
            "data-[swipe=cancel]:translate-y-0 data-[swipe=cancel]:transition-transform data-[swipe=cancel]:duration-200",
            "data-[swipe=end]:translate-y-[var(--radix-toast-swipe-end-y)]",
            "data-[swipe=end]:transition-transform data-[swipe=end]:duration-100"
          )}
        >
          {toastIcon[option.type as keyof typeof toastIcon]}
          <div className="mo:flex-col tb:flex-row tb:gap-1 flex">
            <Toast.Title
              className={cn(
                "tb:typo-body-xl-semibold mo:typo-body-md-semibold flex w-full items-center justify-center text-center whitespace-nowrap text-white"
              )}
            >
              {option.message}
            </Toast.Title>
            <div
              className={cn(
                "tb:typo-body-xl-semibold mo:typo-body-md-semibold flex w-full items-center justify-center text-center whitespace-nowrap text-white"
              )}
            >
              {option.subMessage}
            </div>
          </div>
        </Toast.Root>
      ))}
      <Toast.Viewport className="fixed bottom-15 left-1/2 z-50 flex -translate-x-1/2 flex-col outline-none" />
    </Toast.Provider>
  );
};

export default ToastComponent;
