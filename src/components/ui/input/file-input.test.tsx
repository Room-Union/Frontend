import ReactHookFormProvider from "@/providers/reacthookform-provider";
import renderWithQueryClient from "@/utils/testRenderWithQueryClient";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileInput from "./file-input";

describe("FileInput 컴포넌트 테스트", () => {
  global.URL.createObjectURL = jest.fn(() => "mock-url");

  type RenderFileInputProps = {
    name?: string;
    label?: string;
    required?: boolean;
    previewClassName?: string;
    ButtonComponent?: React.ComponentType<{ onClick: () => void }>;
  };

  const renderFileInput = (props?: RenderFileInputProps) => {
    const formOptions = {
      defaultValues: { [props?.name || "fileInput"]: undefined },
    };

    return renderWithQueryClient(
      <ReactHookFormProvider options={formOptions}>
        <FileInput
          name={props?.name || "fileInput"}
          label={props?.label}
          previewClassName={props?.previewClassName}
          ButtonComponent={props?.ButtonComponent}
        />
      </ReactHookFormProvider>
    );
  };

  const createMockFile = (name = "test-image.jpg", type = "image/jpeg") => {
    return new File(["test"], name, { type });
  };

  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe("초기 렌더링 및 Props 테스트", () => {
    test("input(file)과 업로드 버튼이 렌더링된다", () => {
      renderFileInput();

      const fileInput = screen.getByTestId("file-input");
      const uploadButton = screen.getByTestId("upload-button");

      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute("type", "file");
      expect(uploadButton).toBeInTheDocument();
    });

    test("label prop을 전달하면 라벨이 렌더링된다", () => {
      const testLabel = "이미지 업로드";
      renderFileInput({ label: testLabel });
      expect(screen.getByText(testLabel)).toBeInTheDocument();
    });

    test("ButtonComponent prop을 전달하면 커스텀 버튼이 렌더링된다", () => {
      const CustomButton = ({ onClick }: { onClick: () => void }) => (
        <button onClick={onClick} data-testid="custom-upload-button">
          커스텀 버튼
        </button>
      );
      renderFileInput({ ButtonComponent: CustomButton });

      expect(screen.getByTestId("custom-upload-button")).toBeInTheDocument();
      expect(screen.queryByTestId("upload-button")).not.toBeInTheDocument();
    });

    test("required prop을 전달하면 라벨에 *이 렌더링된다", () => {
      renderFileInput({ required: true });

      const star = screen.getByText("*");
      expect(star).toBeInTheDocument();
    });
  });

  describe("이미지 파일 업로드 및 삭제 테스트", () => {
    let fileInput: HTMLInputElement;

    beforeEach(() => {
      renderFileInput();
      fileInput = screen.getByTestId("file-input") as HTMLInputElement;
    });

    test("이미지 업로드: 업로드 버튼이 사라지고 미리보기와 삭제 버튼이 나타난다", async () => {
      const testFile = createMockFile();

      await user.upload(fileInput, testFile);

      await waitFor(() => {
        expect(screen.queryByTestId("upload-button")).not.toBeInTheDocument();
        expect(screen.getByTestId("preview-image")).toBeInTheDocument();
        expect(screen.getByTestId("delete-button")).toBeInTheDocument();
      });
    });

    test("이미지 삭제: 미리보기와 삭제 버튼이 사라지고 업로드 버튼이 나타난다", async () => {
      const testFile = createMockFile();
      await user.upload(fileInput, testFile);

      let deleteButton: HTMLElement;
      await waitFor(() => {
        deleteButton = screen.getByTestId("delete-button");
      });

      await user.click(deleteButton!);

      await waitFor(() => {
        expect(screen.queryByTestId("preview-image")).not.toBeInTheDocument();
        expect(screen.queryByTestId("delete-button")).not.toBeInTheDocument();
        expect(screen.getByTestId("upload-button")).toBeInTheDocument();
      });
    });
  });
});
