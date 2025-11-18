import { signUpFormOptions } from "@/form-options/sign-up-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import { SignUpSchemaType } from "@/types/schema";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithQueryClient } from "../../../../../jest.setup";
import EmailEntryStep from "./email-entry-step";

describe("EmailEntryStep 컴포넌트 테스트", () => {
  let emailInput: HTMLElement;
  let nextButton: HTMLElement;

  const onNextMock = jest.fn();
  beforeEach(() => {
    renderWithQueryClient(
      <ReactHookFormProvider<SignUpSchemaType> options={signUpFormOptions}>
        <EmailEntryStep onNext={onNextMock} />
      </ReactHookFormProvider>
    );

    emailInput = screen.getByLabelText(/이메일/i);
    nextButton = screen.getByRole("button", { name: "다음" });
  });

  describe("버튼 비활성화 테스트", () => {
    test("이메일 미입력 시 다음 버튼 비활성화되는지 확인", () => {
      expect(emailInput).toHaveValue("");

      expect(nextButton).toBeDisabled();
    });

    test("이메일 형식 미충족 시 다음 버튼 비활성화되는지 확인", async () => {
      fireEvent.change(emailInput, { target: { value: "email" } });

      await waitFor(() => expect(nextButton).toBeDisabled());
    });

    test("이메일 형식 충족 시 다음 버튼 활성화되는지 확인", () => {
      fireEvent.change(emailInput, { target: { value: "email@test.com" } });

      expect(nextButton).toBeEnabled();
    });
  });

  describe("유효성 검사 테스트", () => {
    test("유효하지 않은 이메일 입력 시 오류 메시지 노출되는지 확인", async () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });

      fireEvent.click(nextButton);

      const ErrorMessage =
        await screen.findByText("유효한 이메일 형식이 아닙니다.");
      expect(ErrorMessage).toBeInTheDocument();
    });
  });
});
