"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface UseFileUploadProps {
  name: string;
}

export const useFileUpload = ({ name }: UseFileUploadProps) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { register, resetField, setValue } = useFormContext();
  const { ref: registerRef, ...rest } = register(name);

  // 파일 업로드 핸들러
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 이전 ObjectURL이 있다면 해제
      cleanupPreview();

      // 파일 미리보기 설정
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // react-hook-form 상태에 파일 저장
      setValue(name, file);
    }
  };

  // 파일 삭제 핸들러
  const handleDeleteFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // upload 이벤트 실행 방지
    cleanupPreview();
    resetField(name);
  };

  const handleUpload = () => {
    hiddenInputRef.current?.click();
  };

  // 메모리 정리 함수
  const cleanupPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return cleanupPreview;
  }, [preview]);

  return {
    hiddenInputRef,
    preview,
    registerRef,
    rest,
    handleUploadFile,
    handleDeleteFile,
    handleUpload,
    cleanupPreview,
  };
};
