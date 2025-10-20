import z from "zod";
import { categorySchema, genderSchema, nicknameSchema } from "./validation";

export const editInfoSchema = z
  .object({
    nickname: nicknameSchema,
    gender: genderSchema,
    categories: categorySchema,
  })
  .refine((data) => data.categories.length === 2, {
    path: ["categories"],
    message: "2개의 카테고리를 선택해주세요.",
  });

export type EditInfoSchemaType = z.infer<typeof editInfoSchema>;
