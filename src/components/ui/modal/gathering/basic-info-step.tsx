import { Input } from "@/components/ui";
import UploadButton from "@/components/ui/button/upload-button";
import FileInput from "@/components/ui/input/file-input";
import { inputVariants } from "../../input/input";

const BasicInfoStep = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* Title */}
      <div>
        <Input
          label="모임 이름"
          name="name"
          placeholder="모임 이름을 입력하세요"
          className={inputVariants.input.tb_lg}
          required
        />
      </div>

      {/* Description */}
      <div>
        <Input
          type="textarea"
          label="모임 설명"
          name="description"
          placeholder="모임에 대한 상세한 설명을 입력하세요"
          required
          className={inputVariants.textarea.tb_lg}
        />
      </div>

      {/* Image */}
      <div>
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
