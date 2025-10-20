import queryKeys from "@/apis/query-keys";
import { EditUserInfoRequest } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserInfo } from "../user.api";

const useEditUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: EditUserInfoRequest) => editUserInfo(params),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all }),
  });
};

export default useEditUserInfo;
