import { useModalStore } from "@/store/modal-store";
import { EditUserPasswordRequest } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { editUserPassword } from "../user.api";

const useEditUserPassword = () => {
  const { alertModal } = useModalStore();
  return useMutation({
    mutationFn: (params: EditUserPasswordRequest) => editUserPassword(params),
  });
};

export default useEditUserPassword;
