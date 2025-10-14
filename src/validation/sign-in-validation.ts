import z from "zod";
import { emailSchema, passwordSchema } from "./validation";

export const signInSchema = z.object({
  userName: emailSchema,
  password: passwordSchema,
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
