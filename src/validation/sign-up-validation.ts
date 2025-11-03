import z from "zod";
import {
  categorySchema,
  emailSchema,
  genderSchema,
  nicknameSchema,
  passwordSchema,
  verificationCodeSchema,
} from "./validation";

// 각 스텝별 스키마 정의
export const emailEntrySchema = z.object({
  email: emailSchema,
});

export const verificationCodeEntrySchema = z.object({
  verificationCode: verificationCodeSchema,
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

// 이메일 인증 코드 검증 스키마
export const EmailVerificationSchema = z.object({
  ...emailEntrySchema.shape,
  ...verificationCodeEntrySchema.shape,
});

// 회원가입 전체 스키마 : 각 스텝별 스키마 배열
export const signUpSchema = z
  .object({
    ...emailEntrySchema.shape,
    ...verificationCodeEntrySchema.shape,
    ...passwordEntrySchema.shape,
    ...profileEntrySchema.shape,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });
