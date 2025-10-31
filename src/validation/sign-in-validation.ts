import z from "zod";
import { EMAIL_REGEX, KOREAN_REGEX, PASSWORD_REGEX } from "./validation";

export const signInSchema = z
  .object({
    email: z.string().trim(),
    password: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    if (
      !(
        EMAIL_REGEX.test(data.email) &&
        8 <= data.password.length &&
        data.password.length <= 13 &&
        !KOREAN_REGEX.test(data.password) &&
        PASSWORD_REGEX.test(data.password)
      )
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
      });

      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "아이디 혹은 비밀번호가 일치하지 않습니다.",
      });
    }
  });

export type SignInSchemaType = z.infer<typeof signInSchema>;
