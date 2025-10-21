import { Input } from "@/components/ui";
import UploadButton from "@/components/ui/button/upload-button";
import FileInput from "@/components/ui/input/file-input";
import { inputVariants } from "@/components/ui/input/input";
import { useFormContext } from "react-hook-form";

const BasicInfoStep = () => {
  const { getValues } = useFormContext();
  const meetingImage = getValues("meetingImage");

  // meetingImage가 string(URL)인 경우 defaultPreview로 전달
  const defaultPreview =
    typeof meetingImage === "string" ? meetingImage : undefined;

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
          defaultPreview={defaultPreview}
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
