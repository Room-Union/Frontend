// SignUpRequest : 회원가입 요청 타입
interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  gender: string;
  categories: string;
}

// SignInRequest : 로그인 요청 타입
interface SignInRequest {
  email: string;
  password: string;
}

export type { SignInRequest, SignUpRequest };
