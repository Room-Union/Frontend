import Input from "@/components/ui/input/Input";
import { FormProvider, useForm } from "react-hook-form";
import ModalNav from "../../modal-nav";

interface PasswordEditFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const PasswordEditForm = ({ onCancel, onSubmit }: PasswordEditFormProps) => {
  const methods = useForm({
    mode: "onChange",
  });

  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        className="tb:gap-8 mo:gap-5 flex flex-1 flex-col"
      >
        <div className="tb:gap-6 mo:gap-5 flex flex-col">
          <Input
            name="password"
            label="현재 비밀번호"
            type="password"
            placeholder="현재 비밀번호를 입력해주세요."
          />
          <Input
            name="newPassword"
            label="새 비밀번호"
            type="password"
            placeholder="새 비밀번호를 입력해주세요."
          />
          <Input
            name="newPasswordConfirm"
            label="새 비밀번호 확인"
            type="password"
            placeholder="한 번 더 입력해주세요."
          />
        </div>
        <ModalNav
          onCancel={onCancel}
          onSubmit={handleSubmit}
          completeButtonText="변경 완료"
        />
      </form>
    </FormProvider>
  );
};

export default PasswordEditForm;
