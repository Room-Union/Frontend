"use client";
import useEditUserPassword from "@/apis/user/mutation/use-edit-user-password";
import { Input } from "@/components/ui";
import { EditUserPasswordRequest } from "@/types/user";
import { editPasswordSchema } from "@/validation/edit-password-vaildation";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import ModalNav from "../../modal-nav";

interface PasswordEditFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PasswordEditForm = ({ open, setOpen }: PasswordEditFormProps) => {
  const { mutate: editUserPassword } = useEditUserPassword();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    resolver: zodResolver(editPasswordSchema),
  });

  const setError = methods.setError;

  const handleSubmit = methods.handleSubmit((data: EditUserPasswordRequest) => {
    editUserPassword(data, {
      onSuccess: () => {
        //TODO: 토스트로 변경
        alert("비밀번호 변경이 완료되었습니다.");
        setOpen(false);
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          switch (error.status) {
            case 403:
              setError("password", {
                message: "비밀번호가 일치하지 않습니다",
              });
              break;
            case 400:
              setError("newPassword", {
                message: "새 비밀번호와 비밀번호가 일치합니다",
              });
              break;
          }
        }
      },
    });
  });

  const handleCancel = () => {
    setOpen(false);
  };

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
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          completeButtonText="변경 완료"
        />
      </form>
    </FormProvider>
  );
};

export default PasswordEditForm;
