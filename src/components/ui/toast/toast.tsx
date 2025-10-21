"use client";

import { AlertCircle, Party } from "@/assets/icons-colored";
import { useToastStore } from "@/store/toast-store";
import { Toast } from "radix-ui";
import { useEffect } from "react";

const ToastComponent = () => {
  const { toastOptions, removeToast } = useToastStore();

  useEffect(() => {
    if (toastOptions) {
      toastOptions.forEach((toast) => {
        const timer = setTimeout(() => {
          if (toast.id) removeToast(toast.id);
        }, 2000);
        return () => clearTimeout(timer);
      });
    }
  }, [toastOptions, removeToast]);

  const toastIcon = {
    success: <Party className="tb:size-[50px] mo:size-[38px]" />,
    error: <AlertCircle className="size-6" />,
  };

  return (
    <Toast.Provider>
      {toastOptions?.map((option) => (
        <Toast.Root
          key={option.id}
          open={!!option.message}
          className="bg-base-black-a-900 tb:rounded-[20px] mo:rounded-2xl tb:p-6 mo:p-5 tb:gap-4 mo:gap-3 mb-2 flex w-73 flex-col items-center justify-center gap-1"
        >
          {toastIcon[option.type as keyof typeof toastIcon]}
          <Toast.Title className="text-gray-neutral-50 tb:typo-body-xl-semibold mo:typo-body-md-semibold text-center whitespace-nowrap">
            {option.message}
          </Toast.Title>
        </Toast.Root>
      ))}
      <Toast.Viewport className="fixed bottom-15 left-1/2 z-50 -translate-x-1/2" />
    </Toast.Provider>
  );
};

export default ToastComponent;
