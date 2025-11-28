// API Instance 모킹
jest.mock("@/apis/api");

import api from "@/apis/api";
import { ERROR_MESSAGES } from "@/constants/error-message";
import { signUpFormOptions } from "@/form-options/sign-up-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import { SignUpSchemaType } from "@/types/schema";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClient } from "../../../../../jest.setup";
import EmailVerificationStep from "./email-verification-step";

describe("EmailVerificationForm 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>;

  let verificationCodeInput: HTMLElement;
  let nextButton: HTMLElement;
  let extendButton: HTMLElement;
  let timer: HTMLElement;

  const onPrevMock = jest.fn();
  const onNextMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();

    renderWithQueryClient(
      <ReactHookFormProvider<SignUpSchemaType> options={signUpFormOptions}>
        <EmailVerificationStep onPrev={onPrevMock} onNext={onNextMock} />
      </ReactHookFormProvider>
    );

    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    verificationCodeInput = screen.getByLabelText(/인증코드/i);
    nextButton = screen.getByRole("button", { name: "다음" });
    extendButton = screen.getByRole("button", { name: "시간 연장" });
    timer = screen.getByText(/^\d{2}:\d{2}$/);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("버튼 비활성화 테스트", () => {
    test("인증코드 입력 흐름에 따른 다음 버튼 disabled 상태 테스트", async () => {
      await user.type(verificationCodeInput, "12345");
      await waitFor(() => expect(nextButton).toBeDisabled());

      await user.type(verificationCodeInput, "6");
      await waitFor(() => expect(nextButton).toBeEnabled());
    });

    test("시간에 따른 시간연장 버튼 disabled 상태 테스트", () => {
      expect(extendButton).toBeDisabled();

      // 초기값 3분 -> 2분 경과 : 1분 남았을 때
      act(() => {
        jest.advanceTimersByTime(120 * 1000);
      });
      expect(extendButton).toBeEnabled();
    });
  });

  describe("인증코드 유효성 검사 테스트", () => {
    test("인증코드 입력 흐름에 따른 error message / correct message 노출 테스트", async () => {
      await user.type(verificationCodeInput, "12345");

      const errorMessage = await screen.findByText("인증 코드는 6자리입니다.");
      expect(errorMessage).toBeInTheDocument();

      await user.type(verificationCodeInput, "6");

      const correctMessage =
        await screen.findByText("인증 코드 입력 완료되었습니다.");
      expect(correctMessage).toBeInTheDocument();
    });

    test("입력한 인증 코드가 숫자가 아닐 경우 error message 노출 테스트", async () => {
      await user.type(verificationCodeInput, "test");

      const ErrorMessage = await screen.findByText(
        "인증 코드는 숫자만 입력 가능합니다."
      );
      expect(ErrorMessage).toBeInTheDocument();
    });
  });

  describe("이메일 인증코드 검증 API 호출에 따른 UI 테스트", () => {
    test("Invalid Code일 경우 에러 메세지 노출 테스트", async () => {
      (api.post as jest.Mock).mockRejectedValue({
        isAxiosError: true,
        response: {
          status: 400,
          data: { code: "INVALID_CODE" },
        },
      });

      await user.type(verificationCodeInput, "123456");

      await waitFor(() => expect(nextButton).toBeEnabled());
      await user.click(nextButton);

      const ErrorMessage = await screen.findByText(
        ERROR_MESSAGES.INVALID_CODE.message
      );

      expect(ErrorMessage).toBeInTheDocument();

      // 입력값이 수정되었을 경우 에러 메시지 사라지는지 확인
      await user.click(verificationCodeInput); // input 포커싱
      await user.keyboard("{Backspace}");

      await waitFor(() => {
        const errorMessage = screen.queryByText(
          ERROR_MESSAGES.INVALID_CODE.message
        );
        expect(errorMessage).toBeNull();
      });
    });
  });

  describe("시간연장 API 호출에 따른 UI 테스트", () => {
    test("시간연장 성공했을 경우 UI 테스트", async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        status: 204,
      });

      expect(timer).toHaveTextContent("03:00");
      await waitFor(() => {
        expect(extendButton).toBeDisabled();
      });

      // 초기값 3분 -> 2분 경과 : 1분 남았을 때
      act(() => jest.advanceTimersByTime(120 * 1000));

      expect(timer).toHaveTextContent("01:00");
      await waitFor(() => {
        expect(extendButton).toBeEnabled();
      });
      await user.click(extendButton);

      await waitFor(() => {
        expect(timer).toHaveTextContent("04:00");
        expect(extendButton).toBeDisabled();
      });
    });
  });
});
