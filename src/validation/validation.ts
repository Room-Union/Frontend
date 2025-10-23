import { z } from "zod";

// 이메일 정규식 :
// zod에서 검증하는 email 형식 정규식
export const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

// 비밀번호 정규식 :
// - 영문자, 숫자, 특수문자를 각각 최소 1개 이상 포함해야 함
// - 허용 특수문자: !@#$%^*()_+-=~
// - 공백 불가
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^*()_+\-=~])[A-Za-z\d!@#$%^*()_+\-=~]+$/;

// 닉네임 정규식:
// - 영어 대소문자, 숫자, 한글(가~힣)만 허용
// - 공백이나 특수문자 사용 불가
const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]+$/;

// 각 필드별 스키마 정의
// zod의 z.email()은 Gmail Rules와 유사하게 검증
export const emailSchema = z
  .email("유효한 이메일 형식이 아닙니다.")
  .trim()
  .nonempty();

export const verificationCodeSchema = z
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
  .array(
    z.enum([
      "CULTURE_ART",
      "GAME",
      "HOBBY",
      "COMMUNICATION",
      "INFO_ECONOMY",
      "SELF_DEVELOPMENT",
    ])
  )
  .length(2, "카테고리를 2개 선택해주세요.");

export const genderSchema = z.enum(["MALE", "FEMALE", "NONE"], {
  message: "성별을 선택해주세요.",
});
