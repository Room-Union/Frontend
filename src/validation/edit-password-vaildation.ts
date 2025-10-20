import z from "zod";
import { passwordSchema } from "./validation";

export const editPasswordSchema = z
  .object({
    password: passwordSchema,
    newPassword: passwordSchema,
    newPasswordConfirm: passwordSchema,
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });
