import { gatheringSchema } from "@/validation/gathering-validation";
import { signInSchema } from "@/validation/sign-in-validation";
import {
  EmailVerificationSchema,
  emailEntrySchema,
  signUpSchema,
} from "@/validation/sign-up-validation";
import z from "zod";

// 이메일 전송 스키마 타입
export type SendEmailSchemaType = z.infer<typeof emailEntrySchema>;

// 이메일 인증코드 검증 스키마 타입
export type SendVerificationCodeSchemaType = z.infer<
  typeof EmailVerificationSchema
>;

// 회원가입 전체 스키마 타입 : 유니온 타입
export type SignUpSchemaType = z.infer<typeof signUpSchema>;

// 로그인 스키마 타입
export type SignInSchemaType = z.infer<typeof signInSchema>;

// 모임 스키마 타입
export type GatheringSchemaType = z.infer<typeof gatheringSchema>;

// 전체 스키마 타입
export type SchemaType =
  | SignUpSchemaType
  | SignInSchemaType
  | GatheringSchemaType;
