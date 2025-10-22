import { CategoryType } from "./constants";

// SignUpRequest : 회원가입 요청 타입
interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  gender: string;
  categories: CategoryType[];
}

// SignInRequest : 로그인 요청 타입
interface SignInRequest {
  email: string;
  password: string;
}

// SendEmailRequest : email 전송 요청 타입
interface SendEmailRequest {
  email: string;
}

// SendVerificationCodeRequest : 인증 코드 검증 요청 타입
interface SendVerificationCodeRequest extends SendEmailRequest {
  code: string;
}

export type {
  SendEmailRequest,
  SendVerificationCodeRequest,
  SignInRequest,
  SignUpRequest,
};
