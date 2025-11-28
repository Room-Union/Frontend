import { signUpFormOptions } from "@/form-options/sign-up-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import { SignUpSchemaType } from "@/types/schema";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClient } from "../../../../../jest.setup";
import PasswordEntryStep from "./password-entry-step";

describe("EmailEntryStep 컴포넌트 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>;

  let passwordInput: HTMLElement;
  let confirmInput: HTMLElement;
  let nextButton: HTMLElement;

  const onNextMock = jest.fn();
  const setStepMock = jest.fn();

  beforeEach(async () => {
    renderWithQueryClient(
      <ReactHookFormProvider<SignUpSchemaType> options={signUpFormOptions}>
        <PasswordEntryStep onNext={onNextMock} setStep={setStepMock} />
      </ReactHookFormProvider>
    );

    user = userEvent.setup();

    passwordInput = screen.getByLabelText(/^비밀번호\s*\*$/);
    confirmInput = screen.getByLabelText(/^비밀번호 확인\s*\*$/);
    nextButton = screen.getByRole("button", { name: "다음" });
  });

  describe("버튼 비활성화 테스트", () => {
    test("비밀번호 / 비밀번호 확인 입력 흐름에 따른 다음 버튼 disabled 상태 테스트", async () => {
      await user.type(passwordInput, "password123!");
      await user.type(confirmInput, "password123");
      await waitFor(() => expect(nextButton).toBeDisabled());

      await user.type(confirmInput, "!");
      await waitFor(() => expect(nextButton).toBeEnabled());
    });

    test("비밀번호 -> 비밀번호 확인 -> 비밀번호 입력 흐름에 따른 다음 버튼 disabled 상태 테스트", async () => {
      await user.type(passwordInput, "password123!");
      await user.type(confirmInput, "password123!!");
      await waitFor(() => expect(nextButton).toBeDisabled());

      await user.type(passwordInput, "!");
      await waitFor(() => expect(nextButton).toBeEnabled());
    });
  });

  describe("유효성 검사 테스트", () => {
    test("비밀번호 입력 흐름에 따른 error message / correct message 노출 테스트", async () => {
      await user.type(passwordInput, "passwor");

      const lengthErrorMessage = await screen.findByText(
        "비밀번호는 8자 이상 13자 이하입니다."
      );
      expect(lengthErrorMessage).toBeInTheDocument();

      await user.type(passwordInput, "d123");

      const regexErrorMessage = await screen.findByText(
        "영문, 숫자, 특수문자(!@#$%^*()_+=-~)를 모두 포함해야 합니다."
      );
      expect(regexErrorMessage).toBeInTheDocument();

      await user.type(passwordInput, "!");

      const correctMessage =
        await screen.findByText("올바른 비밀번호 형식입니다.");
      expect(correctMessage).toBeInTheDocument();
    });

    test("비밀번호 확인 입력 흐름에 따른 error message / correct message 노출 테스트", async () => {
      await user.type(passwordInput, "password123!!");
      await user.type(confirmInput, "password123!");

      const errorMessage =
        await screen.findByText("비밀번호가 일치하지 않습니다.");
      expect(errorMessage).toBeInTheDocument();

      await user.type(confirmInput, "!");

      const correctMessage = await screen.findByText("비밀번호와 일치합니다.");
      expect(correctMessage).toBeInTheDocument();
    });
  });
});
