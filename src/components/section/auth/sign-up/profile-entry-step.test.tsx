import { CATEGORIES } from "@/constants/constants";
import { signUpFormOptions } from "@/form-options/sign-up-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import { SignUpSchemaType } from "@/types/schema";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClient } from "../../../../../jest.setup";
import ProfileEntryStep from "./profile-entry-step";

describe("ProfileEntryStep 컴포넌트 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>;

  let nicknameInput: HTMLElement;
  let genderNone: HTMLElement;
  let categoryGame: HTMLElement;
  let categoryHobby: HTMLElement;
  let nextButton: HTMLElement;

  const onPrevMock = jest.fn();

  beforeEach(() => {
    renderWithQueryClient(
      <ReactHookFormProvider<SignUpSchemaType> options={signUpFormOptions}>
        <ProfileEntryStep onPrev={onPrevMock} isPending={false} />
      </ReactHookFormProvider>
    );

    user = userEvent.setup();

    nicknameInput = screen.getByLabelText(/닉네임/i);
    genderNone = screen.getByRole("radio", { name: "밝히지 않음" });
    categoryGame = screen.getByRole("checkbox", { name: CATEGORIES[1].name });
    categoryHobby = screen.getByRole("checkbox", { name: CATEGORIES[2].name });
    nextButton = screen.getByRole("button", { name: "가입 완료" });

    // 입력값 초기화
    fireEvent.change(nicknameInput, { target: { value: "" } });
  });

  describe("버튼 비활성화 테스트", () => {
    test("프로필 입력 흐름에 따른 다음 버튼 disabled 상태 테스트", async () => {
      await user.type(nicknameInput, "테스트");
      await user.click(genderNone);
      await user.click(categoryGame);

      await waitFor(() => expect(nextButton).toBeDisabled());

      await user.click(categoryHobby);
      await waitFor(() => expect(nextButton).toBeEnabled());
    });
  });

  describe("유효성 검사 테스트", () => {
    test("닉네임 입력 흐름에 따른 error message / correct message 노출 테스트", async () => {
      await user.type(nicknameInput, "집");

      const errorMessage = await screen.findByText(
        "닉네임은 2자 이상 16 이하입니다."
      );
      expect(errorMessage).toBeInTheDocument();

      await user.type(nicknameInput, "콕");

      const correctMessage =
        await screen.findByText("올바른 닉네임 형식입니다.");
      expect(correctMessage).toBeInTheDocument();
    });

    test("카테고리 선택 흐름에 따른 error message / correct message 노출 테스트", async () => {
      await user.click(categoryGame);

      const errorMessage =
        await screen.findByText("카테고리를 2개 선택해주세요.");
      expect(errorMessage).toBeInTheDocument();

      await user.click(categoryHobby);

      await waitFor(() => {
        const errorMessage = screen.queryByText("카테고리를 2개 선택해주세요.");

        expect(errorMessage).toBeNull();
      });
    });
  });
});
