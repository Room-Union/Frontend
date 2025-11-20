// API Instance 모킹
jest.mock("@/apis/api");

import api from "@/apis/api";
import { ERROR_MESSAGES } from "@/constants/error-message";
import { signUpFormOptions } from "@/form-options/sign-up-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import { SignUpSchemaType } from "@/types/schema";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithQueryClient } from "../../../../../jest.setup";
import EmailVerificationStep from "./email-verification-step";

describe("EmailVerificationForm 테스트", () => {
  let verificationCodeInput: HTMLElement;
  let nextButton: HTMLElement;

  const onPrevMock = jest.fn();
  const onNextMock = jest.fn();

  beforeEach(() => {
    renderWithQueryClient(
      <ReactHookFormProvider<SignUpSchemaType> options={signUpFormOptions}>
        <EmailVerificationStep onPrev={onPrevMock} onNext={onNextMock} />
      </ReactHookFormProvider>
    );

    verificationCodeInput = screen.getByLabelText(/인증코드/i);
    nextButton = screen.getByRole("button", { name: "다음" });
  });

  describe("버튼 비활성화 테스트", () => {
    test("인증코드가 6자 미만이면 다음 버튼 비활성화", async () => {
      fireEvent.change(verificationCodeInput, { target: { value: "123" } });
      await waitFor(() => expect(nextButton).toBeDisabled());
    });

    test("인증코드 6자리 입력 시 다음 버튼 활성화되는지 확인", () => {
      fireEvent.change(verificationCodeInput, { target: { value: "123456" } });

      expect(nextButton).toBeEnabled();
    });
  });

  describe("인증코드 유효성 검사 테스트", () => {
    test("입력한 인증코드가 6자리 미만일 오류 메시지 노출되는지 확인", async () => {
      fireEvent.change(verificationCodeInput, { target: { value: "123" } });

      const ErrorMessage = await screen.findByText("인증 코드는 6자리입니다.");
      expect(ErrorMessage).toBeInTheDocument();
    });

    test("입력한 인증 코드가 숫자가 아닐 경우 오류 메시지 노출되는지 확인", async () => {
      fireEvent.change(verificationCodeInput, {
        target: { value: "test입력" },
      });

      const ErrorMessage = await screen.findByText(
        "인증 코드는 숫자만 입력 가능합니다."
      );
      expect(ErrorMessage).toBeInTheDocument();
    });

    test("입력한 인증 코드가 6자리일 경우 correct message 노출되는지 확인", async () => {
      fireEvent.change(verificationCodeInput, { target: { value: "123456" } });

      const CorrectMessage =
        await screen.findByText("인증 코드 입력 완료되었습니다.");
      expect(CorrectMessage).toBeInTheDocument();
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

      fireEvent.change(verificationCodeInput, {
        target: { value: "123456" },
      });

      await waitFor(() => expect(nextButton).toBeEnabled());

      fireEvent.click(nextButton);

      const ErrorMessage = await screen.findByText(
        ERROR_MESSAGES.INVALID_CODE.message
      );
      expect(ErrorMessage).toBeInTheDocument();

      // 입력값이 수정되었을 경우 에러 메시지 사라지는지 확인
      fireEvent.change(verificationCodeInput, {
        target: { value: "12345" },
      });
      await waitFor(() => {
        const errorMessage = screen.queryByText(
          ERROR_MESSAGES.INVALID_CODE.message
        );
        expect(errorMessage).toBeNull();
      });
    });
  });
});
