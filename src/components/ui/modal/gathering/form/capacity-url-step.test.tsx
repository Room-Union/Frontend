import { gatheringFormOptions } from "@/form-options/gathering-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import renderWithQueryClient from "@/utils/testRenderWithQueryClient";
import { GatheringSchemaType } from "@/validation/gathering-validation";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CapacityUrlStep from "./capacity-url-step";

describe("CapacityUrlStep 컴포넌트 테스트", () => {
  beforeEach(() => {
    renderWithQueryClient(
      <ReactHookFormProvider<GatheringSchemaType>
        options={gatheringFormOptions({})}
      >
        <CapacityUrlStep />
      </ReactHookFormProvider>
    );
  });

  describe("최대 인원 필드", () => {
    const validValue = "10";
    const invalidMinValue = "1";
    const invalidMaxValue = "101";

    const errorText = "모임 최대 인원은 2명 이상 100명 이하입니다.";
    const emptyErrorText = "모임 최대 인원을 입력해주세요.";

    describe("초기 화면 렌더링 테스트", () => {
      test("최대 인원 라벨이 렌더링된다", () => {
        const maxMemberCountLabel = screen.getByText("최대 인원");
        expect(maxMemberCountLabel).toBeInTheDocument();
      });

      test("최대 인원 입력 필드가 렌더링된다", () => {
        const maxMemberCountInput = screen.getByPlaceholderText("최소 2명");
        expect(maxMemberCountInput).toBeInTheDocument();
      });

      test("최대 인원 단위가 렌더링된다", () => {
        const maxMemberCountUnit = screen.getByText("명");
        expect(maxMemberCountUnit).toBeInTheDocument();
      });
    });

    describe("상호작용 테스트", () => {
      let user: ReturnType<typeof userEvent.setup>;
      let maxMemberCountInput: HTMLInputElement;

      beforeEach(() => {
        user = userEvent.setup();
        maxMemberCountInput = screen.getByPlaceholderText("최소 2명");
      });

      test("최대 인원 입력 필드에 값을 입력하면 값이 반영된다", async () => {
        await user.type(maxMemberCountInput, validValue);
        await waitFor(() => {
          expect(maxMemberCountInput).toHaveValue(Number(validValue));
        });
      });
    });

    describe("상태 메세지 및 유효성 검사 테스트", () => {
      let user: ReturnType<typeof userEvent.setup>;
      let maxMemberCountInput: HTMLInputElement;

      beforeEach(() => {
        user = userEvent.setup();
        maxMemberCountInput = screen.getByPlaceholderText("최소 2명");
      });

      test("값을 2명 미만으로 입력하면 에러메세지가 렌더링된다", async () => {
        await user.type(maxMemberCountInput, invalidMinValue);

        await waitFor(() => {
          const errorMessage = screen.getByText(errorText);
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("값을 100명 초과로 입력하면 에러메세지가 렌더링된다", async () => {
        await user.type(maxMemberCountInput, invalidMaxValue);

        await waitFor(() => {
          const errorMessage = screen.getByText(errorText);
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("입력했던 값을 모두 지우면 에러메세지가 렌더링된다", async () => {
        await user.type(maxMemberCountInput, validValue);
        await user.clear(maxMemberCountInput);

        await waitFor(() => {
          const errorMessage = screen.getByText(emptyErrorText);
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("에러 메세지가 렌더링된 상태에서 값을 올바르게 입력하면 에러메세지가 사라진다", async () => {
        await user.type(maxMemberCountInput, invalidMinValue);
        await waitFor(() => {
          const errorMessage = screen.getByText(errorText);
          expect(errorMessage).toBeInTheDocument();
        });

        await user.clear(maxMemberCountInput);

        await user.type(maxMemberCountInput, validValue);
        await waitFor(() => {
          const errorMessage = screen.queryByText(errorText);
          expect(errorMessage).not.toBeInTheDocument();
        });
      });
    });
  });

  // dynamic-input.test.tsx에서 테스트 진행함
  describe("URL 필드", () => {
    describe("초기 화면 렌더링 테스트", () => {
      test("URL 라벨이 렌더링된다", () => {
        const urlLabel = screen.getByText("URL");
        expect(urlLabel).toBeInTheDocument();
      });

      test("URL 입력 필드가 렌더링된다", () => {
        const urlInput = screen.getByPlaceholderText("https://discord.gg/abce");
        expect(urlInput).toBeInTheDocument();
      });
    });

    describe("상태 메세지 및 유효성 검사 테스트", () => {
      let user: ReturnType<typeof userEvent.setup>;
      let urlInputs: HTMLInputElement[];

      const validUrl = "https://discord.gg/test";
      const invalidUrl = "invalid-url";

      const emptyErrorText = "값을 입력해주세요";
      const invalidUrlErrorText = "유효한 URL 형식이 아닙니다.";

      beforeEach(() => {
        user = userEvent.setup();
        urlInputs = screen.getAllByPlaceholderText("https://discord.gg/abce");
      });

      test("유효하지 않은 URL을 입력하면 에러메세지가 렌더링된다", async () => {
        await user.type(urlInputs[0], invalidUrl);

        await waitFor(() => {
          const errorMessage = screen.getByText(invalidUrlErrorText);
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("입력했던 값을 모두 지우면 에러메세지가 렌더링된다", async () => {
        await user.type(urlInputs[0], validUrl);
        await user.clear(urlInputs[0]);

        await waitFor(() => {
          const errorMessage = screen.getByText(emptyErrorText);
          expect(errorMessage).toBeInTheDocument();
        });
      });

      test("에러 메세지가 렌더링된 상태에서 값을 올바르게 입력하면 에러메세지가 사라진다", async () => {
        await user.type(urlInputs[0], invalidUrl);
        await waitFor(() => {
          const errorMessage = screen.getByText(invalidUrlErrorText);
          expect(errorMessage).toBeInTheDocument();
        });

        await user.clear(urlInputs[0]);

        await user.type(urlInputs[0], validUrl);
        await waitFor(() => {
          const errorMessage = screen.queryByText(invalidUrlErrorText);
          expect(errorMessage).not.toBeInTheDocument();
        });
      });
    });
  });
});
