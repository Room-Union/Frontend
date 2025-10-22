"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface UseFileUploadProps {
  name: string;
  defaultPreview?: string; // 초기 미리보기 URL (DB에서 받은 이미지)
}

export const useFileUpload = ({ name, defaultPreview }: UseFileUploadProps) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(defaultPreview || null);

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

      // react-hook-form 상태에 파일 추가 & validation 실행 & 필드 변경 및 터치됨 true
      setValue(name, file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
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
  const cleanupPreview = useCallback(() => {
    if (preview) {
      // URL.createObjectURL로 생성된 이미지일 경우, 메모리 정리
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null); // 미리보기 이미지 초기화
    }
  }, [preview]);

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

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
