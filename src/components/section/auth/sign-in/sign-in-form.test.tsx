// API Instance 모킹
jest.mock("@/apis/api");

import api from "@/apis/api";
import { ToastComponent } from "@/components/ui";
import { useToastStore } from "@/store/toast-store";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithQueryClient } from "../../../../../jest.setup";
import SignInForm from "./sign-in-form";

describe("SignInForm 컴포넌트 테스트", () => {
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let loginButton: HTMLElement;

  beforeEach(() => {
    jest.clearAllMocks();
    // 이전 테스트의 toast 상태 초기화
    useToastStore.setState({ toastOptions: [] });

    renderWithQueryClient(
      <>
        <SignInForm />
        <ToastComponent />
      </>
    );

    emailInput = screen.getByLabelText("이메일");
    passwordInput = screen.getByLabelText("비밀번호");
    loginButton = screen.getByRole("button", { name: "로그인" });
  });

  describe("버튼 비활성화 테스트", () => {
    test("로그인 폼의 이메일과 비밀번호 미입력 시 로그인 버튼 비활성화되는지 확인", () => {
      expect(emailInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");

      expect(loginButton).toBeDisabled();
    });

    test("이메일, 비밀번호 입력 시 로그인 버튼 활성화되는지 확인", () => {
      fireEvent.change(emailInput, { target: { value: "test" } });
      fireEvent.change(passwordInput, { target: { value: "test" } });

      expect(loginButton).toBeEnabled();
    });
  });

  describe("유효성 검사 테스트", () => {
    test("유효하지 않은 이메일 입력 시 오류 메시지 노출되는지 확인", async () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.change(passwordInput, {
        target: { value: "validPassword123!" },
      });

      fireEvent.click(loginButton);

      const errorMessage = await screen.findByText(
        "아이디 혹은 비밀번호가 일치하지 않습니다."
      );
      expect(errorMessage).toBeInTheDocument();
    });

    test("유효하지 않은 비밀번호 입력 시 오류 메시지 노출되는지 확인", async () => {
      fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
      fireEvent.change(passwordInput, {
        target: { value: "invalid-password" },
      });

      fireEvent.click(loginButton);

      const errorMessage = await screen.findByText(
        "아이디 혹은 비밀번호가 일치하지 않습니다."
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("로그인 API 호출에 따른 UI 테스트", () => {
    test("로그인 성공했을 경우 토스트 노출 테스트", async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        status: 204,
        data: { accessToken: "xxx" },
      });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123!" } });

      fireEvent.click(loginButton);

      const toast = await screen.findByText((content) =>
        content.includes("로그인 성공했습니다!")
      );

      expect(toast).toBeInTheDocument();
    });

    test("로그인 실패했을 경우 에러 메세지 노출 테스트", async () => {
      (api.post as jest.Mock).mockRejectedValue({
        isAxiosError: true,
        response: {
          status: 400,
          data: { code: "INVALID_INPUT_VALUE" },
        },
      });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "wrong123!" } });

      fireEvent.click(loginButton);

      const errorMessage = await screen.findByText(
        "아이디 혹은 비밀번호가 일치하지 않습니다."
      );
      expect(errorMessage).toBeInTheDocument();

      // 입력값이 수정되었을 경우 에러 메시지 사라지는지 확인
      fireEvent.change(passwordInput, { target: { value: "password" } });
      await waitFor(() => {
        const errorMessage = screen.queryByText(
          "아이디 혹은 비밀번호가 일치하지 않습니다."
        );
        expect(errorMessage).toBeNull();
      });
    });
  });
});
