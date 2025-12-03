import AlertModal from "@/components/ui/modal/alert/alert-modal";
import CreateGatheringModal from "@/components/ui/modal/gathering/form/create-gathering-modal";
import { ERROR_MESSAGES } from "@/constants/error-message";
import { AUTH_MODAL_MESSAGES } from "@/constants/modal-message";
import { GATHERING_SUCCESS_MESSAGES } from "@/constants/success-message";
import { gatheringFormOptions } from "@/form-options/gathering-form-option";
import ReactHookFormProvider from "@/providers/reacthookform-provider";
import { useModalStore } from "@/store/modal-store";
import * as authUtils from "@/utils/auth";
import { GatheringSchemaType } from "@/validation/gathering-validation";
import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClient } from "../../../../../../jest.setup";

const mockCreateGathering = jest.fn();
const mockPush = jest.fn();

jest.mock("@/apis/gathering/mutation/use-create-gathering", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mutate: mockCreateGathering,
    isPending: false,
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/utils/auth", () => ({
  checkIsSignedIn: jest.fn(),
}));

describe("CreateGatheringModal 컴포넌트 테스트", () => {
  const triggerButtonText = "모임 생성";

  const formModalTitle = "모임 생성";
  const formModalCancel = "취소";

  const mockCheckIsSignedIn = authUtils.checkIsSignedIn as jest.MockedFunction<
    typeof authUtils.checkIsSignedIn
  >;

  const renderComponent = () => {
    cleanup();
    useModalStore.getState().removeModalOptions();
    return renderWithQueryClient(
      <ReactHookFormProvider<GatheringSchemaType>
        options={gatheringFormOptions({})}
      >
        <CreateGatheringModal />
        <AlertModal />
      </ReactHookFormProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
  });

  describe("초기 렌더링 테스트", () => {
    beforeEach(() => {
      renderComponent();
    });

    test("트리거 버튼이 렌더링된다.", () => {
      const triggerButton = screen.getByRole("button", {
        name: triggerButtonText,
      });

      expect(triggerButton).toBeInTheDocument();
    });
  });

  describe("인증 상태 별 모달 동작 테스트", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
      user = userEvent.setup();
    });

    describe("로그인을 하지 않은 상태에서", () => {
      let triggerButton: HTMLElement;

      const loginModalTitle = AUTH_MODAL_MESSAGES.LOGIN_REQUIRED.message;
      const loginModalCancel = AUTH_MODAL_MESSAGES.LOGIN_REQUIRED.cancelText;
      const loginModalConfirm = AUTH_MODAL_MESSAGES.LOGIN_REQUIRED.confirmText;

      const openLoginModal = async () => {
        await user.click(triggerButton);

        await waitFor(() => {
          const requiredLoginModal = screen.getByRole("dialog", {
            name: loginModalTitle,
          });
          expect(requiredLoginModal).toBeInTheDocument();
        });
      };

      beforeEach(() => {
        mockCheckIsSignedIn.mockReturnValue(false);
        renderComponent();
        triggerButton = screen.getByRole("button", { name: triggerButtonText });
      });

      test("트리거 버튼을 누르면 로그인 모달이 렌더링된다.", async () => {
        await openLoginModal();
      });

      test("로그인 모달의 취소 버튼을 누르면 모달이 닫힌다.", async () => {
        await openLoginModal();

        const cancelButton = screen.getByRole("button", {
          name: loginModalCancel,
        });
        await user.click(cancelButton);

        await waitFor(() => {
          const requiredLoginModal = screen.queryByRole("dialog", {
            name: loginModalTitle,
          });
          expect(requiredLoginModal).not.toBeInTheDocument();
        });
      });

      test("로그인 모달의 로그인 버튼을 누르면 로그인 페이지로 이동한다.", async () => {
        await openLoginModal();

        const confirmButton = screen.getByRole("button", {
          name: loginModalConfirm,
        });
        await user.click(confirmButton);

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith("/sign-in");
          expect(mockPush).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("로그인을 한 상태에서", () => {
      let triggerButton: HTMLElement;

      const openGatheringFormModal = async () => {
        await user.click(triggerButton);

        await waitFor(() => {
          const gatheringForm = screen.getByRole("dialog", {
            name: formModalTitle,
          });
          expect(gatheringForm).toBeInTheDocument();
        });
      };

      beforeEach(() => {
        mockCheckIsSignedIn.mockReturnValue(true);
        renderComponent();
        triggerButton = screen.getByRole("button", { name: triggerButtonText });
      });

      test("트리거 버튼을 누르면 모임 생성 모달이 렌더링된다.", async () => {
        await openGatheringFormModal();
      });

      test("모임 생성 모달의 취소 버튼을 누르면 모달이 닫힌다.", async () => {
        await openGatheringFormModal();

        const cancelButton = screen.getByRole("button", {
          name: formModalCancel,
        });
        await user.click(cancelButton);

        await waitFor(() => {
          const gatheringForm = screen.queryByRole("dialog", {
            name: formModalTitle,
          });
          expect(gatheringForm).not.toBeInTheDocument();
        });
      });
    });
  });

  describe("폼 제출 및 API 테스트", () => {
    let user: ReturnType<typeof userEvent.setup>;
    let triggerButton: HTMLElement;

    const formModalSubmit = "완료";

    const successMessage = GATHERING_SUCCESS_MESSAGES.CREATE.message;
    const errorMessage = ERROR_MESSAGES.DEFAULT.message;

    const openGatheringFormModal = async () => {
      await user.click(triggerButton);

      await waitFor(() => {
        const gatheringForm = screen.getByRole("dialog", {
          name: formModalTitle,
        });
        expect(gatheringForm).toBeInTheDocument();
      });
    };

    const fillAllFormFields = async () => {
      const gameCategory = screen.getByLabelText("게임");
      await user.click(gameCategory);

      const step1NextButton = screen.getByRole("button", { name: "다음" });
      await user.click(step1NextButton);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("모임 이름을 입력하세요")
        ).toBeInTheDocument();
      });

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

      const maxMemberInput = screen.getByPlaceholderText("최소 2명");
      await user.type(maxMemberInput, "10");

      const urlInputs = screen.getAllByPlaceholderText(
        "https://discord.gg/abce"
      );
      await user.type(urlInputs[0], "https://discord.gg/test123");
    };

    beforeEach(() => {
      user = userEvent.setup();
      mockCheckIsSignedIn.mockReturnValue(true);
      renderComponent();
      triggerButton = screen.getByRole("button", { name: triggerButtonText });
    });

    test("폼 제출 버튼을 누르면 모임 생성 요청이 발생한다.", async () => {
      await openGatheringFormModal();
      await fillAllFormFields();

      const submitButton = screen.getByRole("button", {
        name: formModalSubmit,
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockCreateGathering).toHaveBeenCalled();
      });
    });

    test("모임 생성 요청이 성공하면 모달이 닫히고 모임 생성 성공 토스트가 표시되며 상세 페이지로 이동한다.", async () => {
      await openGatheringFormModal();
      await fillAllFormFields();

      const submitButton = screen.getByRole("button", {
        name: formModalSubmit,
      });

      await user.click(submitButton);

      // Todo: 추가하기
    });

    test("모임 생성 요청이 실패하면 에러 토스트가 표시되며 모달이 닫히지 않는다.", async () => {
      await openGatheringFormModal();
      await fillAllFormFields();

      const submitButton = screen.getByRole("button", {
        name: formModalSubmit,
      });

      await user.click(submitButton);

      // Todo: 추가하기
    });
  });
});
