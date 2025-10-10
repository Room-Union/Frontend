"use client";
import { XCircle } from "@/assets/icons";
import { useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/utils/cn";
import Image from "next/image";
import UploadButton from "../button/upload-button";

interface FileInputProps {
  label?: string;
  name: string;
  previewClassName?: string;
  ButtonComponent?: React.ComponentType<{ onClick: () => void }>;
}

const FileInput = ({
  label,
  name,
  previewClassName,
  ButtonComponent = UploadButton,
}: FileInputProps) => {
  const {
    hiddenInputRef,
    preview,
    registerRef,
    rest,
    handleUploadFile,
    handleDeleteFile,
    onUpload,
  } = useFileUpload({ name });

  return (
    <div className="flex flex-col gap-2">
      {/* label */}
      {label && <label>{label}</label>}

      <div className="relative">
        {/* hidden input */}
        <input
          type="file"
          accept="image/*" // 이미지 파일만 업로드 가능
          {...rest}
          ref={(e) => {
            registerRef(e); // react-hook-form에 등록
            hiddenInputRef.current = e; // 파일 입력 요소 참조
          }}
          onChange={handleUploadFile}
          className="hidden"
        />

        {/* preview (실제 보이는 부분) */}
        {preview ? (
          <div
            onClick={onUpload}
            className={cn(
              "relative cursor-pointer overflow-hidden",
              previewClassName
            )}
          >
            <Image
              className="h-full w-full object-cover"
              src={preview}
              alt="preview"
              fill
            />

            {/* delete button */}
            <button
              type="button"
              className="absolute top-[12px] right-[12px] size-[18px] cursor-pointer"
              onClick={handleDeleteFile}
            >
              <XCircle
                className="text-blue-500 hover:text-blue-600"
                strokeWidth={0}
              />
            </button>
          </div>
        ) : (
          <ButtonComponent onClick={onUpload} />
        )}
      </div>
    </div>
  );
};

export default FileInput;
