import ImagePlusIcon from "@/assets/icons/image-plus";

interface UploadButtonProps {
  onClick: () => void;
}

const UploadButton = ({ onClick }: UploadButtonProps) => {
  return (
    <button
      type="button"
      data-testid="upload-button"
      onClick={onClick}
      className="flex size-[144px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-neutral-50 p-3 text-center"
    >
      <ImagePlusIcon className="size-[19px] text-neutral-400" strokeWidth={0} />
      <p className="text-base leading-snug font-medium text-neutral-400">
        파일 첨부
      </p>
    </button>
  );
};

export default UploadButton;
