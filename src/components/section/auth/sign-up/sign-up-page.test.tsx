jest.mock("@/apis/api");

jest.mock("react-error-boundary", () => ({
  ErrorBoundary: ({ children }: any) => children,
}));

import api from "@/apis/api";
import SignUpPage from "@/app/(root)/(auth)/sign-up/page";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  mockNavigation,
  renderWithQueryClient,
} from "../../../../../jest.setup";

describe("회원가입 페이지 테스트", () => {
  mockNavigation.pathname = "/sign-up";

  let user: ReturnType<typeof userEvent.setup>;

  let emailInput: HTMLElement;
  let verificationCodeInput: HTMLElement;
  let passwordInput: HTMLElement;
  let confirmInput: HTMLElement;
  let nicknameInput: HTMLElement;
  let genderNone: HTMLElement;
  let categoryGame: HTMLElement;
  let categoryHobby: HTMLElement;

  let nextButton: HTMLElement;
  let prevButton: HTMLElement;
  let submitButton: HTMLElement;

  let toast: HTMLElement;

  beforeEach(() => {
    renderWithQueryClient(<SignUpPage />);

    jest.useFakeTimers();

    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // Step1. EmailEntryStep
    emailInput = screen.getByLabelText(/이메일/i);
    nextButton = screen.getByRole("button", { name: "다음" });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("회원가입 Funnel 구조 흐름 테스트", () => {
    test("Step1. 이메일 입력 -> Step2. 인증코드 시간 만료되었을 경우, Step1 자동으로 이동되는지 테스트 ", async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        status: 204,
        data: { accessToken: "xxx" },
      });

      // Step1.EmailEntryStep
      await user.type(emailInput, "test@test.com");

      await waitFor(() => expect(nextButton).toBeEnabled());
      await user.click(nextButton);

      // Step2.EmailVerificationStep
      verificationCodeInput = await screen.findByLabelText(/인증코드/i);
      await waitFor(() => expect(verificationCodeInput).toBeInTheDocument());

      // 타이머 3분 경과
      act(() => {
        jest.advanceTimersByTime(180 * 1000);
      });

      // Step1 자동 이동 확인
      emailInput = await screen.findByLabelText(/이메일/i);
      await waitFor(() => expect(emailInput).toBeInTheDocument());
    });
  });
});
