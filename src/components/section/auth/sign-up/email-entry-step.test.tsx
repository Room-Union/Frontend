// API Instance 모킹
jest.mock("@/apis/api");

import api from "@/apis/api";
import { ERROR_MESSAGES } from "@/constants/error-message";
import { signUpFormOptions } from "@/form-options/sign-up-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import { SignUpSchemaType } from "@/types/schema";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClient } from "../../../../../jest.setup";
import EmailEntryStep from "./email-entry-step";

describe("EmailEntryStep 컴포넌트 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>;

  let emailInput: HTMLElement;
  let nextButton: HTMLElement;

  const onNextMock = jest.fn();
  beforeEach(() => {
    renderWithQueryClient(
      <ReactHookFormProvider<SignUpSchemaType> options={signUpFormOptions}>
        <EmailEntryStep onNext={onNextMock} />
      </ReactHookFormProvider>
    );

    // 이전 테스트 모킹 초기화
    jest.clearAllMocks();

    user = userEvent.setup();

    emailInput = screen.getByLabelText(/이메일/i);
    nextButton = screen.getByRole("button", { name: "다음" });
  });

  describe("버튼 비활성화 테스트", () => {
    test("이메일 입력 흐름에 따른 다음 버튼 disabled 상태 테스트", async () => {
      await user.type(emailInput, "email@test");
      await waitFor(() => expect(nextButton).toBeDisabled());

      await user.type(emailInput, ".com");
      await waitFor(() => expect(nextButton).toBeEnabled());
    });
  });

  describe("유효성 검사 테스트", () => {
    test("이메일 입력 흐름에 따른 error message / correct message 노출 테스트", async () => {
      await user.type(emailInput, "email@test");

      const errorMessage =
        await screen.findByText("유효한 이메일 형식이 아닙니다.");
      expect(errorMessage).toBeInTheDocument();

      await user.type(emailInput, ".com");

      const correctMessage =
        await screen.findByText("올바른 이메일 형식입니다.");
      expect(correctMessage).toBeInTheDocument();
    });
  });

  describe("이메일 인증코드 발송 API 호출에 따른 UI 테스트", () => {
    const submitUserEmail = async () => {
      await user.type(emailInput, "test@email.com");

      await waitFor(() => expect(nextButton).toBeEnabled());
      await user.click(nextButton);
    };

    test("이메일 중복 검사 통과하지 못했을 경우 에러 메세지 노출 테스트", async () => {
      (api.post as jest.Mock).mockRejectedValue({
        isAxiosError: true,
        response: {
          status: 400,
          data: { code: "ALREADY_REGISTERED_EMAIL" },
        },
      });

      await submitUserEmail();

      const errorMessage = await screen.findByText(
        ERROR_MESSAGES.ALREADY_REGISTERED_EMAIL.message
      );
      expect(errorMessage).toBeInTheDocument();
    });

    test("이메일 중복 검사 실패로 인해 에러 메세지 노출된 이후, 입력값 수정할 경우 에러 메세지 사라지는지 테스트", async () => {
      (api.post as jest.Mock).mockRejectedValue({
        isAxiosError: true,
        response: {
          status: 400,
          data: { code: "ALREADY_REGISTERED_EMAIL" },
        },
      });

      await submitUserEmail();

      const errorMessage = await screen.findByText(
        ERROR_MESSAGES.ALREADY_REGISTERED_EMAIL.message
      );
      expect(errorMessage).toBeInTheDocument();

      // 입력값이 수정되었을 경우 에러 메시지 사라지는지 확인
      await user.click(emailInput); // input 포커싱
      await user.keyboard("{Backspace}");

      await waitFor(() => {
        const errorMessage = screen.queryByText(
          ERROR_MESSAGES.ALREADY_REGISTERED_EMAIL.message
        );

        expect(errorMessage).toBeNull();
      });
    });
  });
});
