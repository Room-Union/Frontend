import { SignUpRequest } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../auth.api";

const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpRequest) => signUpUser(data),
  });
};

export default useSignUp;
