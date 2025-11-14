import { fireEvent, screen } from "@testing-library/react";
import { RenderWithQueryClient } from "../../../../../jest.setup";
import SignInForm from "./sign-in-form";

describe("SignInForm 컴포넌트 테스트", () => {
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let loginButton: HTMLElement;

  beforeEach(() => {
    RenderWithQueryClient(<SignInForm />);

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
});
