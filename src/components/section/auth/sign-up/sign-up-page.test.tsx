jest.mock("@/apis/api");

jest.mock("react-error-boundary", () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
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
    jest.useFakeTimers();

    renderWithQueryClient(
      <>
        <SignUpPage />
        <ToastComponent />
      </>
    );

    // 이전 테스트 모킹 & 토스트 상태 초기화
    jest.clearAllMocks();
    useToastStore.setState({ toastOptions: [] });

    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // Step1. EmailEntryStep
    emailInput = screen.getByLabelText(/이메일/i);
    nextButton = screen.getByRole("button", { name: "다음" });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const goToStep2 = async () => {
    await user.type(emailInput, "test@email.com");

    await waitFor(() => expect(nextButton).toBeEnabled());
    await user.click(nextButton);
  };

  const goToStep3 = async () => {
    await user.type(verificationCodeInput, "123456");

    await waitFor(() => expect(nextButton).toBeEnabled());
    await user.click(nextButton);
  };

  const goToStep4 = async () => {
    await user.type(passwordInput, "Password123!");
    await user.type(confirmInput, "Password123!");

    await waitFor(() => expect(nextButton).toBeEnabled());
    await user.click(nextButton);
  };

  const CompleteSignUp = async () => {
    await user.type(nicknameInput, "테스트");
    await user.click(genderNone);
    await user.click(categoryGame);
    await user.click(categoryHobby);

    await waitFor(() => expect(submitButton).toBeEnabled());
    await user.click(submitButton);
  };

  describe("회원가입 Funnel 구조 흐름 테스트", () => {
    test("Step1. 이메일 입력 -> Step2. 인증코드 시간 만료되었을 경우, Step1 자동으로 이동되는지 테스트 ", async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        status: 204,
      });

      // Step1.EmailEntryStep
      await goToStep2();

      // Step2.EmailVerificationStep
      verificationCodeInput = await screen.findByLabelText(/인증코드/i);
      await waitFor(() => expect(verificationCodeInput).toBeInTheDocument()); // Step2 렌더링 확인

      // 타이머 3분 경과
      act(() => {
        jest.advanceTimersByTime(180 * 1000);
      });

      // 유효시간 만료 toast 노출 확인
      toast = await screen.findByText((content) =>
        content.includes("유효시간이 만료되었습니다.")
      );
      await waitFor(() => expect(toast).toBeInTheDocument());

      // Step1 자동 이동 확인
      emailInput = await screen.findByLabelText(/이메일/i);
      await waitFor(() => expect(emailInput).toBeInTheDocument());
    });
  });

  test("Step1. 이메일 입력 -> Step2. 인증코드 입력 -> Step3. 이전 버튼 클릭할 경우, Step1으로 이동되는지 테스트 ", async () => {
    (api.post as jest.Mock)
      .mockResolvedValueOnce({
        status: 204,
      })
      .mockResolvedValueOnce({
        status: 204,
      });

    // Step1.EmailEntryStep
    await goToStep2();

    // Step2.EmailVerificationStep
    verificationCodeInput = await screen.findByLabelText(/인증코드/i);
    nextButton = await screen.findByRole("button", { name: "다음" });
    await waitFor(() => expect(verificationCodeInput).toBeInTheDocument()); // Step2 렌더링 확인

    await goToStep3();

    // Step3.PasswordEntryStep
    passwordInput = await screen.findByLabelText(/^비밀번호\s*\*$/);
    prevButton = await screen.findByRole("button", { name: "이전" });
    await waitFor(() => expect(passwordInput).toBeInTheDocument()); // Step3 렌더링 확인

    await user.click(prevButton);

    // Step1 이동 확인
    emailInput = await screen.findByLabelText(/이메일/i);
    await waitFor(() => expect(emailInput).toBeInTheDocument());
  });

  describe("Submit API 호출에 따른 UI 테스트", () => {
    test("회원가입 API 호출 성공 이후, 가입 완료 토스트 노출 테스트", async () => {
      (api.post as jest.Mock)
        .mockResolvedValueOnce({
          status: 204,
        })
        .mockResolvedValueOnce({
          status: 204,
        })
        .mockResolvedValueOnce({
          status: 204,
        });

      // Step1.EmailEntryStep
      await goToStep2();

      // Step2.EmailVerificationStep
      verificationCodeInput = await screen.findByLabelText(/인증코드/i);
      nextButton = await screen.findByRole("button", { name: "다음" });
      await waitFor(() => expect(verificationCodeInput).toBeInTheDocument());

      await goToStep3();

      // Step3.PasswordEntryStep
      passwordInput = await screen.findByLabelText(/^비밀번호\s*\*$/);
      confirmInput = screen.getByLabelText(/비밀번호 확인/i);
      nextButton = await screen.findByRole("button", { name: "다음" });
      await waitFor(() => expect(passwordInput).toBeInTheDocument()); // Step3 렌더링 확인

      await goToStep4();

      // Step4.ProfileEntryStep
      nicknameInput = await screen.findByLabelText(/닉네임/i);
      genderNone = screen.getByRole("radio", { name: "밝히지 않음" });
      categoryGame = screen.getByRole("checkbox", { name: CATEGORIES[1].name });
      categoryHobby = screen.getByRole("checkbox", {
        name: CATEGORIES[2].name,
      });
      submitButton = await screen.findByRole("button", { name: "가입 완료" });
      await waitFor(() => expect(nicknameInput).toBeInTheDocument()); // Step4 렌더링 확인

      await CompleteSignUp();

      toast = await screen.findByText((content) =>
        content.includes("회원가입이 완료되었습니다!")
      );
      await waitFor(() => expect(toast).toBeInTheDocument());
    });

    test("회원가입 API 호출 이후 중복된 닉네임일 경우 닉네임 필드 에러 상태 및 error message 노출 테스트", async () => {
      (api.post as jest.Mock)
        .mockResolvedValueOnce({
          status: 204,
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
      await goToStep2();

      // Step2.EmailVerificationStep
      verificationCodeInput = await screen.findByLabelText(/인증코드/i);
      nextButton = await screen.findByRole("button", { name: "다음" });
      await waitFor(() => expect(verificationCodeInput).toBeInTheDocument()); // Step2 렌더링 확인

      await goToStep3();

      // Step3.PasswordEntryStep
      passwordInput = await screen.findByLabelText(/^비밀번호\s*\*$/);
      confirmInput = screen.getByLabelText(/비밀번호 확인/i);
      nextButton = await screen.findByRole("button", { name: "다음" });
      await waitFor(() => expect(passwordInput).toBeInTheDocument()); // Step3 렌더링 확인

      await goToStep4();

      // Step4.ProfileEntryStep
      nicknameInput = await screen.findByLabelText(/닉네임/i);
      genderNone = screen.getByRole("radio", { name: "밝히지 않음" });
      categoryGame = screen.getByRole("checkbox", { name: CATEGORIES[1].name });
      categoryHobby = screen.getByRole("checkbox", {
        name: CATEGORIES[2].name,
      });
      submitButton = await screen.findByRole("button", { name: "가입 완료" });
      await waitFor(() => expect(nicknameInput).toBeInTheDocument()); // Step4 렌더링 확인

      await CompleteSignUp();

      const errorMessage = await screen.findByText(
        ERROR_MESSAGES.ALREADY_REGISTERED_NICKNAME.message
      );

      await waitFor(() => expect(errorMessage).toBeInTheDocument());
      expect(nicknameInput).toHaveClass("inset-ring-red-500");
    });

    test("회원가입 API 호출 결과 중복된 닉네임일 경우 error message 노출 이후 닉네임 입력값 수정 시 에러 메세지 사라지는지 테스트", async () => {
      (api.post as jest.Mock)
        .mockResolvedValueOnce({
          status: 204,
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
      await goToStep2();

      // Step2.EmailVerificationStep
      verificationCodeInput = await screen.findByLabelText(/인증코드/i);
      nextButton = await screen.findByRole("button", { name: "다음" });
      await waitFor(() => expect(verificationCodeInput).toBeInTheDocument()); // Step2 렌더링 확인

      await goToStep3();

      // Step3.PasswordEntryStep
      passwordInput = await screen.findByLabelText(/^비밀번호\s*\*$/);
      confirmInput = screen.getByLabelText(/비밀번호 확인/i);
      nextButton = await screen.findByRole("button", { name: "다음" });
      await waitFor(() => expect(passwordInput).toBeInTheDocument()); // Step3 렌더링 확인

      await goToStep4();

      // Step4.ProfileEntryStep
      nicknameInput = await screen.findByLabelText(/닉네임/i);
      genderNone = screen.getByRole("radio", { name: "밝히지 않음" });
      categoryGame = screen.getByRole("checkbox", { name: CATEGORIES[1].name });
      categoryHobby = screen.getByRole("checkbox", {
        name: CATEGORIES[2].name,
      });
      submitButton = await screen.findByRole("button", { name: "가입 완료" });
      await waitFor(() => expect(nicknameInput).toBeInTheDocument()); // Step4 렌더링 확인

      await CompleteSignUp();

      const errorMessage = await screen.findByText(
        ERROR_MESSAGES.ALREADY_REGISTERED_NICKNAME.message
      );

      await waitFor(() => expect(errorMessage).toBeInTheDocument());
      expect(nicknameInput).toHaveClass("inset-ring-red-500");

      // 입력값이 수정되었을 경우 에러 메시지 사라지는지 확인
      await user.click(nicknameInput); // input 포커싱
      await user.keyboard("{Backspace}");

      await waitFor(() => {
        const errorMessage = screen.queryByText(
          ERROR_MESSAGES.INVALID_CODE.message
        );

        expect(errorMessage).toBeNull();
        expect(nicknameInput).not.toHaveClass("inset-ring-red-500");
      });
    });
  });
});
