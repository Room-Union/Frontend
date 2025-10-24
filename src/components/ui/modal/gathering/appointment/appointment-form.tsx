import {
  FileInput,
  Input,
  ModalNav,
  NumberInput,
  UploadButton,
} from "@/components/ui";
import { inputVariants } from "@/components/ui/input/input";
import DateTimePicker from "@/components/ui/picker/date-time-picker";
import { formatISO } from "date-fns";
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

  const handleSubmit = methods.handleSubmit((data) => {
    // date와 time을 조합하여 ISO 형식으로 포맷
    const date = data.date; // Date 객체
    const time = data.time; // {hour: number, minute: number}

    date.setHours(time.hour, time.minute, 0, 0);

    const payload = {
      title: data.title,
      maxMemberCount: data.maxMemberCount,
      image: data.image,
      scheduledAt: formatISO(date),
    };

    //Todo: API 요청
    console.log(payload);
  });

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
          <DateTimePicker control={methods.control} />
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
