import { SignInRequest } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../auth.api";

const useSignIn = () => {
  return useMutation({
    mutationFn: (data: SignInRequest) => signInUser(data),
  });
};

export default useSignIn;
