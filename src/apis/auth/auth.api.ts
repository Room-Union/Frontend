import { SignUpRequest } from "@/types/user";
import { api } from "../api";

export const signUpUser = async (data: SignUpRequest) => {
  await api.post("/users/signup", {
    body: data,
  });
};
