import { useAuthStore } from "@/store/auth-store";
import { SignInRequest } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../auth.api";

const useSignIn = () => {
  return useMutation({
    mutationFn: (data: SignInRequest) => signInUser(data),
    onSuccess: () => useAuthStore.getState().setSignedIn(),
  });
};

export default useSignIn;
