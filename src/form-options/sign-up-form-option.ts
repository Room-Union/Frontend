import { SignUpSchemaType } from "@/types/schema";
import { signUpSchema } from "@/validation/sign-up-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps } from "react-hook-form";

export const signUpFormOptions: UseFormProps<SignUpSchemaType> = {
  resolver: zodResolver(signUpSchema),
  mode: "onChange",
  defaultValues: {
    email: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    gender: "FEMALE",
    categories: [],
  },
};
