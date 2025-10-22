"use client";
import useEditUserPassword from "@/apis/user/mutation/use-edit-user-password";
import { Input } from "@/components/ui";
import { useToastStore } from "@/store/toast-store";
import { EditUserPasswordRequest } from "@/types/user";
import { editPasswordSchema } from "@/validation/edit-password-vaildation";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import ModalNav from "../../modal-nav";

interface PasswordEditFormProps {
  setOpen: (open: boolean) => void;
}

const PasswordEditForm = ({ setOpen }: PasswordEditFormProps) => {
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
  const { toast } = useToastStore();
  const setError = methods.setError;

  const handleSubmit = methods.handleSubmit((data: EditUserPasswordRequest) => {
    editUserPassword(data, {
      onSuccess: () => {
        toast({
          type: "success",
          message: "비밀번호 변경이 완료되었습니다.",
        });
        setOpen(false);
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          switch (error.response?.data.code) {
            case "INVALID_PASSWORD":
              setError("password", {
                message: "입력하신 현재 비밀번호가 올바르지 않습니다.",
              });
              break;
            case "SAME_PASSWORD":
              setError("newPassword", {
                message:
                  "같은 비밀번호로는 변경할 수 없습니다. 새 비밀번호를 설정해주세요.",
              });
              break;
            case "INVALID_INPUT_VALUE":
              setError("password", {
                message: "입력하신 비밀번호 형식이 올바르지 않습니다.",
              });
              break;
            case "USER_NOT_FOUND":
              setError("password", {
                message: "사용자 정보를 찾을 수 없습니다.",
              });
              break;
            case "INTERNAL_SERVER_ERROR":
              setError("password", {
                message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
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
