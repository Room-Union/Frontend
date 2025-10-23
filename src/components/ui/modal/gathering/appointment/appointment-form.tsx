import {
  FileInput,
  Input,
  ModalNav,
  NumberInput,
  UploadButton,
} from "@/components/ui";
import { FormProvider, useForm } from "react-hook-form";

interface AppointmentFormProps {
  setOpen: (open: boolean) => void;
}

const AppointmentForm = ({ setOpen }: AppointmentFormProps) => {
  const methods = useForm({
    mode: "onChange",
  });

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = methods.handleSubmit((data) => console.log(data));
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Input
            name="title"
            label="약속명"
            placeholder="약속명을 입력하세요"
          />
          {/* Todo: 약속 날짜 컴포넌트 추가 */}
          <NumberInput
            name="maxMemberCount"
            label="모집 인원"
            placeholder="최소 2명"
            unit="명"
          />
          <FileInput
            name="image"
            label="이미지"
            previewClassName="size-[144px] rounded-lg"
            ButtonComponent={UploadButton}
          />
        </div>
      </form>
      <ModalNav
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        completeButtonText="생성"
      />
    </FormProvider>
  );
};

export default AppointmentForm;
