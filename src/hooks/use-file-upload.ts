"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface UseFileUploadProps {
  name: string;
  defaultPreview?: string; // 초기 미리보기 URL (DB에서 받은 이미지)
}

export const useFileUpload = ({ name, defaultPreview }: UseFileUploadProps) => {
  const { register, setValue, control } = useFormContext();
  const fileValue = useWatch({ control, name });

  const [preview, setPreview] = useState<string | null>(defaultPreview ?? null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Preview용 Blob URL 생성 및 정리
  useEffect(() => {
    if (!fileValue) {
      setPreview(defaultPreview ?? null);
      return;
    }

    if (fileValue instanceof File) {
      const blobUrl = URL.createObjectURL(fileValue);
      setPreview(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    }

    if (typeof fileValue === "string") {
      setPreview(fileValue);
    }
  }, [fileValue, defaultPreview]);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue(name, file, { shouldValidate: true, shouldDirty: true });
  };

  const handleDeleteFile = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    setValue(name, undefined, { shouldValidate: true, shouldDirty: true });
  };

  const handleUpload = () => hiddenInputRef.current?.click();

  const { ref: registerRef, ...rest } = register(name);

  return {
    hiddenInputRef,
    preview,
    registerRef,
    rest,
    handleUploadFile,
    handleDeleteFile,
    handleUpload,
  };
};
