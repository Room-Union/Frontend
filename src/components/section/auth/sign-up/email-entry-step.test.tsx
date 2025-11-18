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
});
