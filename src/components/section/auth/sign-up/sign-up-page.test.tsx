jest.mock("@/apis/api");

jest.mock("react-error-boundary", () => ({
  ErrorBoundary: ({ children }: any) => children,
}));

import api from "@/apis/api";
import SignUpPage from "@/app/(root)/(auth)/sign-up/page";
import { ToastComponent } from "@/components/ui";
import { CATEGORIES } from "@/constants/constants";
import { ERROR_MESSAGES } from "@/constants/error-message";
import { useToastStore } from "@/store/toast-store";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  mockNavigation,
  renderWithQueryClient,
} from "../../../../../jest.setup";

describe("회원가입 페이지 테스트", () => {
  jest.clearAllMocks();
  // 이전 테스트의 toast 상태 초기화
  useToastStore.setState({ toastOptions: [] });

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
    renderWithQueryClient(
      <>
        <SignUpPage />
        <ToastComponent />
      </>
    );

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

  test("Step1. 이메일 입력 -> Step2. 인증코드 입력 -> Step3. 이전 버튼 클릭할 경우, Step1으로 이동되는지 테스트 ", async () => {
    (api.post as jest.Mock)
      .mockResolvedValueOnce({
        status: 204,
        data: { accessToken: "xxx" },
      })
      .mockResolvedValueOnce({
        status: 204,
      });

    // Step1.EmailEntryStep
    await user.type(emailInput, "test@test.com");

    await waitFor(() => expect(nextButton).toBeEnabled());
    await user.click(nextButton);

    // Step2.EmailVerificationStep
    verificationCodeInput = await screen.findByLabelText(/인증코드/i);
    nextButton = await screen.findByRole("button", { name: "다음" });
    await waitFor(() => expect(verificationCodeInput).toBeInTheDocument());

    user.type(verificationCodeInput, "123456");

    await waitFor(() => expect(nextButton).toBeEnabled());
    await user.click(nextButton);

    // Step3.PasswordEntryStep
    passwordInput = await screen.findByLabelText(/^비밀번호\s*\*$/);
    prevButton = await screen.findByRole("button", { name: "이전" });
    await waitFor(() => expect(passwordInput).toBeInTheDocument());

    await user.click(prevButton);

    // Step1 자동 이동 확인
    emailInput = await screen.findByLabelText(/이메일/i);
    await waitFor(() => expect(emailInput).toBeInTheDocument());
  });

  describe("Submit API 호출에 따른 UI 테스트", () => {
    test("회원가입 API 호출 성공 이후, 가입 완료 모달 노출 테스트", async () => {
      (api.post as jest.Mock)
        .mockResolvedValueOnce({
          status: 204,
          data: { accessToken: "xxx" },
        })
        .mockResolvedValueOnce({
          status: 204,
        })
        .mockResolvedValueOnce({
          status: 204,
        });

      // Step1.EmailEntryStep
      await user.type(emailInput, "test@test.com");

      await waitFor(() => expect(nextButton).toBeEnabled());
      await user.click(nextButton);

      // Step2.EmailVerificationStep
      verificationCodeInput = await screen.findByLabelText(/인증코드/i);
      nextButton = await screen.findByRole("button", { name: "다음" });

      // Step2 렌더링 확인
      await waitFor(() => expect(verificationCodeInput).toBeInTheDocument());

      user.type(verificationCodeInput, "123456");

      await waitFor(() => expect(nextButton).toBeEnabled());
      await user.click(nextButton);

      // Step3.PasswordEntryStep
      passwordInput = await screen.findByLabelText(/^비밀번호\s*\*$/);
      confirmInput = screen.getByLabelText(/비밀번호 확인/i);
      nextButton = await screen.findByRole("button", { name: "다음" });

      // Step3 렌더링 확인
      await waitFor(() => expect(passwordInput).toBeInTheDocument());

      await user.type(passwordInput, "Password123!");
      await user.type(confirmInput, "Password123!");

      await waitFor(() => expect(nextButton).toBeEnabled());
      await user.click(nextButton);

      // Step4.ProfileEntryStep
      nicknameInput = await screen.findByLabelText(/닉네임/i);
      genderNone = screen.getByRole("radio", { name: "밝히지 않음" });
      categoryGame = screen.getByRole("checkbox", { name: CATEGORIES[1].name });
      categoryHobby = screen.getByRole("checkbox", {
        name: CATEGORIES[2].name,
      });
      submitButton = await screen.findByRole("button", { name: "가입 완료" });

      // Step4 렌더링 확인
      await waitFor(() => expect(nicknameInput).toBeInTheDocument());

      await user.type(nicknameInput, "테스트");
      await user.click(genderNone);
      await user.click(categoryGame);
      await user.click(categoryHobby);

      await waitFor(() => expect(submitButton).toBeEnabled());
      await user.click(submitButton);

      toast = await screen.findByText((content) =>
        content.includes("회원가입이 완료되었습니다!")
      );
      await waitFor(() => expect(toast).toBeInTheDocument());
    });

    test("회원가입 API 호출 이후 중복된 닉네임일 경우 error message 노출 테스트", async () => {
      (api.post as jest.Mock)
        .mockResolvedValueOnce({
          status: 204,
          data: { accessToken: "xxx" },
        })
        .mockResolvedValueOnce({
          status: 204,
        })
        .mockRejectedValue({
          isAxiosError: true,
          response: {
            status: 400,
            data: { code: "ALREADY_REGISTERED_NICKNAME" },
          },
        });

      // Step1.EmailEntryStep
      await user.type(emailInput, "test@test.com");

      await waitFor(() => expect(nextButton).toBeEnabled());
      await user.click(nextButton);

      // Step2.EmailVerificationStep
      verificationCodeInput = await screen.findByLabelText(/인증코드/i);
      nextButton = await screen.findByRole("button", { name: "다음" });

      // Step2 렌더링 확인
      await waitFor(() => expect(verificationCodeInput).toBeInTheDocument());

      user.type(verificationCodeInput, "123456");

      await waitFor(() => expect(nextButton).toBeEnabled());
      await user.click(nextButton);

      // Step3.PasswordEntryStep
      passwordInput = await screen.findByLabelText(/^비밀번호\s*\*$/);
      confirmInput = screen.getByLabelText(/비밀번호 확인/i);
      nextButton = await screen.findByRole("button", { name: "다음" });

      // Step3 렌더링 확인
      await waitFor(() => expect(passwordInput).toBeInTheDocument());

      await user.type(passwordInput, "Password123!");
      await user.type(confirmInput, "Password123!");

      await waitFor(() => expect(nextButton).toBeEnabled());
      await user.click(nextButton);

      // Step4.ProfileEntryStep
      nicknameInput = await screen.findByLabelText(/닉네임/i);
      genderNone = screen.getByRole("radio", { name: "밝히지 않음" });
      categoryGame = screen.getByRole("checkbox", { name: CATEGORIES[1].name });
      categoryHobby = screen.getByRole("checkbox", {
        name: CATEGORIES[2].name,
      });
      submitButton = await screen.findByRole("button", { name: "가입 완료" });

      // Step4 렌더링 확인
      await waitFor(() => expect(nicknameInput).toBeInTheDocument());

      await user.type(nicknameInput, "테스트");
      await user.click(genderNone);
      await user.click(categoryGame);
      await user.click(categoryHobby);

      await waitFor(() => expect(submitButton).toBeEnabled());
      await user.click(submitButton);

      const errorMessage = await screen.findByText(
        ERROR_MESSAGES.ALREADY_REGISTERED_NICKNAME.message
      );
      await waitFor(() => expect(errorMessage).toBeInTheDocument());
    });
  });
});
