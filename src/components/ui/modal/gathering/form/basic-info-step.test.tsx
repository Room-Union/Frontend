import { gatheringFormOptions } from "@/form-options/gathering-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import renderWithQueryClient from "@/utils/testRenderWithQueryClient";
import { GatheringSchemaType } from "@/validation/gathering-validation";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BasicInfoStep from "./basic-info-step";

describe("BasicInfoStep 컴포넌트 테스트", () => {
  beforeEach(() => {
    renderWithQueryClient(
      <ReactHookFormProvider<GatheringSchemaType>
        options={gatheringFormOptions({})}
      >
        <BasicInfoStep />
      </ReactHookFormProvider>
    );
  });

  describe("모임 이름 필드", () => {
    const validValue = "포로단";
    const shortValue = "포";
    const longValue = "포로단".repeat(11);

    const errorText = "모임 이름은 2자 이상 30자 이하입니다.";
    const emptyErrorText = "모임 이름을 입력해주세요.";

    describe("초기 화면 렌더링 테스트", () => {
      test("모임 이름 라벨이 렌더링된다", () => {
        const nameLabel = screen.getByText("모임 이름");
        expect(nameLabel).toBeInTheDocument();
      });

      test("모임 이름 입력 필드가 렌더링된다", () => {
        const nameInput = screen.getByPlaceholderText("모임 이름을 입력하세요");
        expect(nameInput).toBeInTheDocument();
      });
    });

    describe("상호작용 테스트", () => {
      let user: ReturnType<typeof userEvent.setup>;
      let nameInput: HTMLInputElement;

      beforeEach(() => {
        user = userEvent.setup();
        nameInput = screen.getByPlaceholderText("모임 이름을 입력하세요");
      });

      test("입력 필드에 값을 입력하면 값이 반영된다", async () => {
        await user.type(nameInput, validValue);
        await waitFor(() => {
          expect(nameInput).toHaveValue(validValue);
        });
      });
    });

    describe("상태 메세지 및 유효성 검사 테스트", () => {
      let user: ReturnType<typeof userEvent.setup>;
      let nameInput: HTMLInputElement;

      beforeEach(() => {
        user = userEvent.setup();
        nameInput = screen.getByPlaceholderText("모임 이름을 입력하세요");
      });

      test("값을 2자 이하로 입력하면 에러메세지가 렌더링된다", async () => {
        await user.type(nameInput, shortValue);

        const errorMessage = await screen.findByText(errorText);
        expect(errorMessage).toBeInTheDocument();
      });

      test("값을 30자 초과로 입력하면 에러메세지가 렌더링된다", async () => {
        await user.type(nameInput, longValue);

        const errorMessage = await screen.findByText(errorText);
        expect(errorMessage).toBeInTheDocument();
      });

      test("입력했던 값을 모두 지우면 에러메세지가 렌더링된다", async () => {
        await user.type(nameInput, validValue);
        await user.clear(nameInput);

        const errorMessage = await screen.findByText(emptyErrorText);
        expect(errorMessage).toBeInTheDocument();
      });

      test("에러 메세지가 렌더링된 상태에서 값을 올바르게 입력하면 에러메세지가 사라진다", async () => {
        await user.type(nameInput, shortValue);
        await screen.findByText(errorText);

        await user.type(nameInput, validValue);
        await waitFor(() => {
          expect(screen.queryByText(errorText)).not.toBeInTheDocument();
        });
      });
    });
  });

  describe("모임 설명 필드", () => {
    const validValue = "포로단은 리그오브레전드의 모든 게임을 다룹니다";
    const shortValue = "포";

    const emptyErrorText = "모임 설명을 입력해주세요.";
    const errorText = "모임 설명은 2자 이상 1000자 이하입니다.";

    describe("초기 화면 렌더링 테스트", () => {
      test("모임 설명 라벨이 렌더링된다", () => {
        const descriptionLabel = screen.getByText("모임 설명");
        expect(descriptionLabel).toBeInTheDocument();
      });

      test("모임 설명 입력 필드가 렌더링된다", () => {
        const descriptionInput = screen.getByPlaceholderText(
          "모임에 대한 상세한 설명을 입력하세요"
        );
        expect(descriptionInput).toBeInTheDocument();
      });
    });

    describe("상호작용 테스트", () => {
      let user: ReturnType<typeof userEvent.setup>;
      let descriptionInput: HTMLTextAreaElement;

      beforeEach(() => {
        user = userEvent.setup();
        descriptionInput = screen.getByPlaceholderText(
          "모임에 대한 상세한 설명을 입력하세요"
        );
      });

      test("입력 필드에 값을 입력하면 값이 반영된다", async () => {
        await user.type(descriptionInput, validValue);
        await waitFor(() => {
          expect(descriptionInput).toHaveValue(validValue);
        });
      });
    });

    describe("상태 메세지 및 유효성 검사 테스트", () => {
      let user: ReturnType<typeof userEvent.setup>;
      let descriptionInput: HTMLTextAreaElement;

      beforeEach(() => {
        user = userEvent.setup();
        descriptionInput = screen.getByPlaceholderText(
          "모임에 대한 상세한 설명을 입력하세요"
        );
      });

      test("값을 2자 이하로 입력하면 에러메세지가 렌더링된다", async () => {
        await user.type(descriptionInput, shortValue);

        const errorMessage = await screen.findByText(errorText);
        expect(errorMessage).toBeInTheDocument();
      });

      // test("값을 1000자 초과로 입력하면 에러메세지가 렌더링된다", async () => {
      //   await user.click(descriptionInput);
      //   await user.paste(longValue);

      //   const errorMessage = await screen.findByText(errorText);
      //   expect(errorMessage).toBeInTheDocument();
      // });

      test("입력했던 값을 모두 지우면 에러메세지가 렌더링된다", async () => {
        await user.type(descriptionInput, validValue);
        await user.clear(descriptionInput);

        const errorMessage = await screen.findByText(emptyErrorText);
        expect(errorMessage).toBeInTheDocument();
      });

      test("에러 메세지가 렌더링된 상태에서 값을 올바르게 입력하면 에러메세지가 사라진다", async () => {
        await user.type(descriptionInput, shortValue);
        await screen.findByText(errorText);

        await user.type(descriptionInput, validValue);
        await waitFor(() => {
          expect(screen.queryByText(errorText)).not.toBeInTheDocument();
        });
      });
    });
  });

  // file-input.test.tsx에서 테스트 진행함 -> 여기선 통합 테스트만 추가
  describe("관련 이미지 필드", () => {
    test("관련 이미지 라벨이 렌더링된다", () => {
      const imageLabel = screen.getByText("관련 이미지");
      expect(imageLabel).toBeInTheDocument();
    });

    test("관련 이미지 입력 필드가 렌더링된다", () => {
      const fileInput = screen.getByTestId("file-input");
      expect(fileInput).toBeInTheDocument();
    });
  });
});
