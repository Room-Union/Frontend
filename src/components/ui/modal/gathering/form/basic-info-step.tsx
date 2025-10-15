import { Input } from "@/components/ui";
import UploadButton from "@/components/ui/button/upload-button";
import FileInput from "@/components/ui/input/file-input";

const BasicInfoStep = () => {
  return (
    <div>
      {/* Title */}
      <div className="space-y-3">
        <Input
          label="모임 이름"
          name="name"
          placeholder="모임 이름을 입력하세요"
          className="h-12 w-full border-none bg-neutral-100 px-5 text-neutral-500 outline-none"
        />
      </div>

      {/* Description */}
      <div className="space-y-3">
        <Input
          type="textarea"
          label="모임 설명"
          name="description"
          placeholder="모임에 대한 상세한 설명을 입력하세요"
          className="h-36 w-full resize-none border-none bg-neutral-100 px-5 py-4 text-neutral-500 outline-none"
        />
      </div>

      {/* Image */}
      <div className="space-y-3">
        <FileInput
          label="관련 이미지"
          name="meetingImage"
          previewClassName="size-[144px] rounded-lg"
          ButtonComponent={UploadButton}
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
