import { z } from "zod";

// 이메일/비밀번호/닉네임 정규식 정의
const EMAIL_REGEX = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^*()_+\-=~])[A-Za-z\d!@#$%^*()_+\-=~]+$/;

const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]+$/;

// 각 필드별 스키마 정의
export const emailSchema = z
  .string()
  .trim()
  .nonempty("이메일을 입력해주세요.")
  .regex(EMAIL_REGEX, "유효한 이메일 형식이 아닙니다.");

export const emailVerificationSchema = z
  .string()
  .trim()
  .nonempty("인증 코드를 입력해주세요.")
  .length(6, "인증 코드는 6자리입니다.");

export const passwordSchema = z
  .string()
  .trim()
  .nonempty("비밀번호를 입력해주세요.")
  .refine(
    (value) => value.length >= 8 && value.length <= 13,
    "비밀번호는 8자 이상 13자 이하입니다."
  )
  .regex(
    PASSWORD_REGEX,
    "영문, 숫자, 특수문자(!@#$%^*()_+=-~)를 모두 포함해야 합니다."
  );

export const nicknameSchema = z
  .string()
  .trim()
  .nonempty("닉네임을 입력해주세요.")
  .refine(
    (value) => value.length >= 2 && value.length <= 16,
    "닉네임은 2자 이상 16 이하입니다."
  )
  .regex(NICKNAME_REGEX, "닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.");

export const categorySchema = z
  .array(z.string())
  .length(2, "카테고리를 2개 선택해주세요.");

export const genderSchema = z.string().nonempty("성별을 선택해주세요.");

// 각 스텝별 스키마 정의
export const emailEntrySchema = z.object({
  email: emailSchema,
});

export const emailVerificationEntrySchema = z.object({
  emailVerification: emailVerificationSchema,
});

export const passwordEntrySchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export const profileEntrySchema = z.object({
  nickname: nicknameSchema,
  categories: categorySchema,
  gender: genderSchema,
});

// 회원가입 전체 스키마 : 각 스텝별 스키마 배열
export const signUpSchema = [
  emailEntrySchema,
  emailVerificationEntrySchema,
  passwordEntrySchema,
  profileEntrySchema,
];

// 각 스텝별 스키마 타입 추출
export type EmailEntrySchemaType = z.infer<typeof emailEntrySchema>;
export type EmailVerificationEntrySchemaType = z.infer<
  typeof emailVerificationEntrySchema
>;
export type PasswordEntrySchemaType = z.infer<typeof passwordEntrySchema>;
export type ProfileEntrySchemaType = z.infer<typeof profileEntrySchema>;

// 회원가입 전체 스키마 타입 : 유니온 타입
export type signUpSchemaType =
  | EmailEntrySchemaType
  | EmailVerificationEntrySchemaType
  | PasswordEntrySchemaType
  | ProfileEntrySchemaType;
