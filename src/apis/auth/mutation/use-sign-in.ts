import { useAuthStore } from "@/store/auth-store";
import { SignInRequest } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInUser } from "../auth.api";

const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInRequest) => signInUser(data),
    onMutate: async () => {
      queryClient.clear();
    },
    onSuccess: () => useAuthStore.getState().setSignedIn(),
  });
};

export default useSignIn;
