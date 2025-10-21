import { z } from "zod";

// 비밀번호 정규식 :
// - 영문자, 숫자, 특수문자를 각각 최소 1개 이상 포함해야 함
// - 허용 특수문자: !@#$%^*()_+-=~
// - 공백 불가
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^*()_+\-=~])[A-Za-z\d!@#$%^*()_+\-=~]+$/;

// 닉네임 정규식:
// - 영어 대소문자, 숫자, 한글(가~힣)만 허용
// - 공백이나 특수문자 사용 불가
const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]+$/;

// 각 필드별 스키마 정의
// zod의 z.email()은 Gmail Rules 로 검증
export const emailSchema = z
  .email("유효한 이메일 형식이 아닙니다.")
  .trim()
  .nonempty();

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

// 모임 관련 스키마
export const gatheringCategorySchema = z
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
  .length(1, "카테고리를 1개만 선택해주세요.");

export const gatheringNameSchema = z
  .string()
  .trim()
  .nonempty("모임 이름을 입력해주세요.")
  .refine(
    (value) => value.length >= 2 && value.length <= 30,
    "모임 이름은 2자 이상 30자 이하입니다."
  );

export const gatheringDescriptionSchema = z
  .string()
  .nonempty("모임 설명을 입력해주세요.")
  .refine(
    (value) => value.length >= 2 && value.length <= 1000,
    "모임 설명은 2자 이상 1000자 이하입니다."
  );

export const gatheringImageSchema = z
  .union([z.instanceof(File), z.string()]) // File 또는 string(URL) 형식 허용
  .optional()
  .refine(
    (value) => {
      // File 형식인 경우에만 20MB 이하 체크
      if (value instanceof File) {
        return value.size <= 20 * 1024 * 1024;
      }
      return true;
    },
    {
      message: "이미지 파일 크기는 20MB 이하여야 합니다.",
    }
  );

export const gatheringMaxMemberCountSchema = z
  .string()
  .nonempty("모임 최대 인원을 입력해주세요.")
  .refine((val) => !isNaN(Number(val)) && val.trim() !== "", {
    message: "숫자를 입력해주세요.",
  })
  .transform((val) => Number(val))
  .refine((val) => val >= 2 && val <= 100, {
    message: "모임 최대 인원은 2명 이상 100명 이하입니다.",
  });

export const gatheringPlatformURLSchema = z
  .array(
    z.url({
      protocol: /^https?$/,
      hostname: z.regexes.domain,
      message: "유효한 URL 형식이 아닙니다.",
    })
  )
  .min(1, "최소 1개의 모임 관련 URL을 입력해주세요.");
