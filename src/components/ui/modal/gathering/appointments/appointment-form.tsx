import {
  FileInput,
  Input,
  ModalNav,
  NumberInput,
  UploadButton,
} from "@/components/ui";
import { inputVariants } from "@/components/ui/input/input";
import DateTimePicker from "@/components/ui/picker/date-time-picker";
import { appointmentFormOptions } from "@/form-options/appointment-form-option";
import { AppointmentFormInput } from "@/types/appointments";
import { AppointmentSchemaType } from "@/validation/appointment-validation";
import { Control, FieldValues, FormProvider, useForm } from "react-hook-form";

interface AppointmentFormProps {
  setOpen: (open: boolean) => void;
  onSubmit: (data: AppointmentFormInput) => void;
  defaultValues?: AppointmentFormInput;
}

const AppointmentForm = ({
  setOpen,
  onSubmit,
  defaultValues,
}: AppointmentFormProps) => {
  const methods = useForm<AppointmentSchemaType>(
    appointmentFormOptions({ defaultValues })
  );

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = methods.handleSubmit(onSubmit);
  const isDisabled = !methods.formState.isValid;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Input
            name="title"
            label="약속명"
            placeholder="약속명을 입력하세요"
            className={inputVariants.input.tb_lg}
          />
          <DateTimePicker
            control={methods.control as unknown as Control<FieldValues>}
          />
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
        completeButtonText="완료"
        disabled={isDisabled}
      />
    </FormProvider>
  );
};

export default AppointmentForm;
