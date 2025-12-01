import renderWithQueryClient from "@/utils/testRenderWithQueryClient";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GatheringForm from "./gathering-form";

describe("GatheringForm 컴포넌트 테스트", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  const goToStep2 = async (user: ReturnType<typeof userEvent.setup>) => {
    const gameCategory = screen.getByLabelText("게임");
    await user.click(gameCategory);

    const step1NextButton = screen.getByRole("button", { name: "다음" });
    await user.click(step1NextButton);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("모임 이름을 입력하세요")
      ).toBeInTheDocument();
    });
  };

  const goToStep3 = async (user: ReturnType<typeof userEvent.setup>) => {
    await goToStep2(user);

    const nameInput = screen.getByPlaceholderText("모임 이름을 입력하세요");
    await user.type(nameInput, "테스트 모임");

    const descriptionInput = screen.getByPlaceholderText(
      "모임에 대한 상세한 설명을 입력하세요"
    );
    await user.type(descriptionInput, "테스트 설명");

    const step2NextButton = screen.getByRole("button", { name: "다음" });
    await user.click(step2NextButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("최소 2명")).toBeInTheDocument();
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    renderWithQueryClient(
      <GatheringForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
  });

  describe("초기 렌더링 테스트", () => {
    test("카테고리 선택 화면이 렌더링된다", () => {
      const categoryLabel = "이 모임은 어떤 종류인가요?";
      const categoryStep = screen.getByText(categoryLabel);
      expect(categoryStep).toBeInTheDocument();
    });

    test("첫 번째 스텝에서는 취소 버튼이 렌더링된다", () => {
      const cancelButton = screen.getByRole("button", { name: "취소" });
      expect(cancelButton).toBeInTheDocument();
    });

    test("첫 번째 스텝에서는 다음 버튼이 렌더링된다", () => {
      const nextButton = screen.getByRole("button", { name: "다음" });
      expect(nextButton).toBeInTheDocument();
    });
  });

  describe("버튼 비활성화 및 활성화 테스트", () => {
    let user: ReturnType<typeof userEvent.setup>;
    let nextButton: HTMLElement;

    beforeEach(() => {
      user = userEvent.setup();
      nextButton = screen.getByRole("button", { name: "다음" });
    });

    describe("Step1: SelectCategory", () => {
      test("초기 렌더링 시, Step1의 다음 버튼은 비활성화 상태이다.", () => {
        expect(nextButton).toBeDisabled();
      });

      test("카테고리를 선택하면 다음 버튼이 활성화된다", async () => {
        expect(nextButton).toBeDisabled();

        const gameCategory = screen.getByLabelText("게임");
        await user.click(gameCategory);

        await waitFor(() => {
          expect(nextButton).not.toBeDisabled();
        });
      });
    });

    describe("Step2: BasicInfo", () => {
      beforeEach(async () => {
        await goToStep2(user);
      });

      test("초기 렌더링 시, Step2의 다음 버튼은 비활성화 상태이다.", () => {
        expect(nextButton).toBeDisabled();
      });

      test("이름만 입력하면 다음 버튼은 비활성화 상태이다", async () => {
        const placeholder = "모임 이름을 입력하세요";
        const nameInput = screen.getByPlaceholderText(placeholder);
        const nameValue = "테스트 모임";

        await user.type(nameInput, nameValue);

        await waitFor(() => {
          expect(nextButton).toBeDisabled();
        });
      });

      test("설명만 입력하면 다음 버튼은 비활성화 상태이다", async () => {
        const placeholder = "모임에 대한 상세한 설명을 입력하세요";
        const descriptionInput = screen.getByPlaceholderText(placeholder);
        const descriptionValue = "테스트 설명";

        await user.type(descriptionInput, descriptionValue);

        await waitFor(() => {
          expect(nextButton).toBeDisabled();
        });
      });

      test("필수 필드를 모두 입력하면 다음 버튼이 활성화된다", async () => {
        const namePlaceholder = "모임 이름을 입력하세요";
        const descriptionPlaceholder = "모임에 대한 상세한 설명을 입력하세요";
        const nameValue = "테스트 모임";
        const descriptionValue = "테스트 설명";

        const nameInput = screen.getByPlaceholderText(namePlaceholder);
        const descriptionInput = screen.getByPlaceholderText(
          descriptionPlaceholder
        );

        await user.type(nameInput, nameValue);
        await user.type(descriptionInput, descriptionValue);

        await waitFor(() => {
          expect(nextButton).not.toBeDisabled();
        });
      });

      test("이미지만 업로드하면 다음 버튼은 비활성화 상태이다", async () => {
        const fileInput = screen.getByTestId("file-input");
        const testFile = new File([], "test.png");

        await user.upload(fileInput, testFile);

        await waitFor(() => {
          expect(nextButton).toBeDisabled();
        });
      });
    });

    describe("Step3: CapacityUrlStep", () => {
      beforeEach(async () => {
        await goToStep3(user);
      });

      test("초기 렌더링 시, Step3의 완료 버튼은 비활성화 상태이다", () => {
        const completeButton = screen.getByRole("button", { name: "완료" });
        expect(completeButton).toBeDisabled();
      });

      test("최대 인원만 입력하면 완료 버튼은 비활성화 상태이다", async () => {
        const maxMemberCountInput = screen.getByPlaceholderText("최소 2명");
        const memberCountValue = "10";

        await user.type(maxMemberCountInput, memberCountValue);

        await waitFor(() => {
          const completeButton = screen.getByRole("button", { name: "완료" });
          expect(completeButton).toBeDisabled();
        });
      });

      test("URL만 입력하면 완료 버튼은 비활성화 상태이다", async () => {
        const urlInput = screen.getByPlaceholderText("https://discord.gg/abce");
        const urlValue = "https://discord.gg/test";

        await user.type(urlInput, urlValue);

        await waitFor(() => {
          const completeButton = screen.getByRole("button", { name: "완료" });
          expect(completeButton).toBeDisabled();
        });
      });

      test("필수 필드를 모두 입력하면 완료 버튼이 활성화된다", async () => {
        const maxMemberCountInput = screen.getByPlaceholderText("최소 2명");
        const urlInput = screen.getByPlaceholderText("https://discord.gg/abce");
        const memberCountValue = "10";
        const urlValue = "https://discord.gg/test";

        await user.type(maxMemberCountInput, memberCountValue);
        await user.type(urlInput, urlValue);

        await waitFor(() => {
          const completeButton = screen.getByRole("button", { name: "완료" });
          expect(completeButton).not.toBeDisabled();
        });
      });
    });
  });
});
