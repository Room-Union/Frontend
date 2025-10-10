import z from "zod";

export const signUpSchema = z.object({
  email: z.string(),
  emailVerification: z.number(),
  password: z.string(),
  passwordConfirm: z.string(),
  nickname: z.string(),
  categories: z.array(z.string()),
  gender: z.string(),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
