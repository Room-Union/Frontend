import { CATEGORIES } from "@/constants/constants";
import { gatheringFormOptions } from "@/form-options/gathering-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import renderWithQueryClient from "@/utils/testRenderWithQueryClient";
import { GatheringSchemaType } from "@/validation/gathering-validation";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryStep from "./category-step";

describe("CategoryStep 컴포넌트 테스트", () => {
  const statusMessageText = "카테고리가 선택되었습니다.";
  const errorMessageText = "카테고리를 1개만 선택해주세요.";

  beforeEach(() => {
    renderWithQueryClient(
      <ReactHookFormProvider<GatheringSchemaType>
        options={gatheringFormOptions({})}
      >
        <CategoryStep />
      </ReactHookFormProvider>
    );
  });

  describe("초기 화면 렌더링 테스트", () => {
    test("카테고리 라벨이 렌더링된다", () => {
      const categoryLabel = screen.getByText("이 모임은 어떤 종류인가요?");
      expect(categoryLabel).toBeInTheDocument();
    });

    test("CATEGORIES 배열의 옵션이 모두 렌더링된다", () => {
      CATEGORIES.forEach((category) => {
        expect(screen.getByLabelText(category.name)).toBeInTheDocument();
      });
    });
  });

  describe("상호작용 테스트", () => {
    let user: ReturnType<typeof userEvent.setup>;
    let game: HTMLInputElement;
    let culture: HTMLInputElement;

    beforeEach(() => {
      user = userEvent.setup();
      game = screen.getByLabelText("게임");
      culture = screen.getByLabelText("문화·예술");
    });

    test("옵션을 클릭하면 해당 옵션이 선택된다", async () => {
      await user.click(game);
      await waitFor(() => {
        expect(game).toBeChecked();
      });
    });

    test("여러 개의 옵션을 선택할 수 있다", async () => {
      await user.click(game);
      await user.click(culture);

      await waitFor(() => {
        expect(game).toBeChecked();
        expect(culture).toBeChecked();
      });
    });

    test("선택한 옵션을 다시 클릭하면 선택이 해제된다", async () => {
      await user.click(game);
      await user.click(game);

      await waitFor(() => {
        expect(game).not.toBeChecked();
      });
    });
  });

  describe("상태 메세지 및 유효성 검사 테스트", () => {
    let user: ReturnType<typeof userEvent.setup>;
    let game: HTMLInputElement;
    let culture: HTMLInputElement;

    beforeEach(() => {
      user = userEvent.setup();
      game = screen.getByLabelText("게임");
      culture = screen.getByLabelText("문화·예술");
    });

    test("한 개의 옵션을 선택하면 상태 메시지가 렌더링된다", async () => {
      await user.click(game);

      const statusMessage = await screen.findByText(statusMessageText);
      expect(statusMessage).toBeInTheDocument();
    });

    test("한 개의 옵션을 선택했다가 해제하면 에러메세지가 렌더링된다", async () => {
      await user.click(game);
      await user.click(game);

      const errorMessage = await screen.findByText(errorMessageText);
      expect(errorMessage).toBeInTheDocument();
    });

    test("두 개 이상의 옵션을 선택하면 에러메시지가 렌더링된다", async () => {
      await user.click(game);
      await user.click(culture);

      const errorMessage = await screen.findByText(errorMessageText);
      expect(errorMessage).toBeInTheDocument();
    });

    test("값을 올바르게 입력하면 에러메세지가 사라진다 - 대표 케이스: 2개 이상의 옵션을 선택한 경우", async () => {
      await user.click(game);
      await user.click(culture);
      await screen.findByText(errorMessageText);

      await user.click(game);
      await waitFor(() => {
        expect(screen.queryByText(errorMessageText)).not.toBeInTheDocument();
      });
    });
  });
});
