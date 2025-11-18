// API Instance 모킹
jest.mock("@/apis/api");

import api from "@/apis/api";
import { ERROR_MESSAGES } from "@/constants/error-message";
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

  describe("이메일 인증코드 발송 API 호출에 따른 UI 테스트", () => {
    test("이메일 중복 검사 통과하지 못했을 경우 에러 메세지 노출 테스트", async () => {
      (api.post as jest.Mock).mockRejectedValue({
        isAxiosError: true,
        response: {
          status: 400,
          data: { code: "ALREADY_REGISTERED_EMAIL" },
        },
      });

      fireEvent.change(emailInput, { target: { value: "email@test.com" } });

      await waitFor(() => {
        fireEvent.click(nextButton);
      });

      const ErrorMessage = await screen.findByText(
        ERROR_MESSAGES.ALREADY_REGISTERED_EMAIL.message
      );
      expect(ErrorMessage).toBeInTheDocument();

      // 입력값이 수정되었을 경우 에러 메시지 사라지는지 확인
      fireEvent.change(emailInput, { target: { value: "edit@test.com" } });
      await waitFor(() => {
        const errorMessage = screen.queryByText(
          ERROR_MESSAGES.ALREADY_REGISTERED_EMAIL.message
        );
        expect(errorMessage).toBeNull();
      });
    });
  });
});
