import z from "zod";
import {
  categorySchema,
  emailSchema,
  emailVerificationSchema,
  genderSchema,
  nicknameSchema,
  passwordSchema,
} from "./validation";

// 각 스텝별 스키마 정의
export const emailEntrySchema = z.object({
  email: emailSchema,
});

export const emailVerificationEntrySchema = z.object({
  emailVerification: emailVerificationSchema,
});

export const passwordEntrySchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export const profileEntrySchema = z.object({
  nickname: nicknameSchema,
  categories: categorySchema,
  gender: genderSchema,
});

// 회원가입 전체 스키마 : 각 스텝별 스키마 배열
export const signUpSchema = z
  .object({
    ...emailEntrySchema.shape,
    ...emailVerificationEntrySchema.shape,
    ...passwordEntrySchema.shape,
    ...profileEntrySchema.shape,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

// 회원가입 전체 스키마 타입 : 유니온 타입
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
