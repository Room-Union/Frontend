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
    test("인증코드 미 입력 시 다음 버튼 비활성화되는지 확인", () => {
      expect(verificationCodeInput).toHaveValue("");

      expect(nextButton).toBeDisabled();
    });

    test("인증코드가 6자 미만이면 다음 버튼 비활성화", async () => {
      fireEvent.change(verificationCodeInput, { target: { value: "123" } });
      await waitFor(() => expect(nextButton).toBeDisabled());
    });

    test("인증코드가 6자 초과면 다음 버튼 비활성화", async () => {
      fireEvent.change(verificationCodeInput, { target: { value: "1234567" } });
      await waitFor(() => expect(nextButton).toBeDisabled());
    });

    test("인증코드가 숫자가 아닐 경우 다음 버튼 비활성화", async () => {
      fireEvent.change(verificationCodeInput, { target: { value: "abcdef" } });
      await waitFor(() => expect(nextButton).toBeDisabled());
    });

    test("인증코드 6자리 입력 시 다음 버튼 활성화되는지 확인", () => {
      fireEvent.change(verificationCodeInput, { target: { value: "123456" } });

      expect(nextButton).toBeEnabled();
    });
  });
});
