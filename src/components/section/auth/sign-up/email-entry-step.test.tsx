import { signUpFormOptions } from "@/form-options/sign-up-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import { SignUpSchemaType } from "@/types/schema";
import { screen } from "@testing-library/react";
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

    emailInput = screen.getByLabelText("이메일");
    nextButton = screen.getByRole("button", { name: "다음" });
  });
});
