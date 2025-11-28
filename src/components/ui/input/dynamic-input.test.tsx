import ReactHookFormProvider from "@/providers/reacthookform-provider";
import renderWithQueryClient from "@/utils/testRenderWithQueryClient";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DynamicInput from "./dynamic-input";

describe("DynamicInput 컴포넌트 테스트", () => {
  type RenderFileInputProps = {
    name?: string;
    label?: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
  };

  const renderDynamicInput = (props?: RenderFileInputProps) => {
    const formOptions = {
      defaultValues: { [props?.name || "dynamicInput"]: [""] },
    };

    return renderWithQueryClient(
      <ReactHookFormProvider options={formOptions}>
        <DynamicInput
          label={props?.label || "URL"}
          name={props?.name || "platformURL"}
          required={props?.required}
          placeholder={props?.placeholder}
          className={props?.className}
        />
      </ReactHookFormProvider>
    );
  };

  describe("초기 렌더링 및 Props 테스트", () => {
    test("초기 값이 빈 문자열인 입력 필드와 추가 버튼이 렌더링된다", () => {
      renderDynamicInput();

      const inputs = screen.getAllByRole("textbox");
      const addButton = screen.getByTestId("add-button");

      expect(inputs).toHaveLength(1);
      expect(inputs[0]).toBeInTheDocument();
      expect(inputs[0]).toHaveValue("");
      expect(addButton).toBeInTheDocument();
    });

    test("label prop을 전달하면 라벨이 렌더링된다", () => {
      const testLabel = "URL";

      renderDynamicInput({ label: testLabel });
      const label = screen.getByText(testLabel);
      expect(label).toBeInTheDocument();
    });

    test("placeholder prop을 전달하면 플레이스홀더가 렌더링된다", () => {
      const testPlaceholder = "https://discord.gg/test";

      renderDynamicInput({ placeholder: testPlaceholder });
      const input = screen.getByPlaceholderText(testPlaceholder);
      expect(input).toBeInTheDocument();
    });

    test("required prop을 전달하면 라벨에 *이 렌더링된다", () => {
      renderDynamicInput({ required: true });

      const star = screen.getByText("*");
      expect(star).toBeInTheDocument();
    });
  });

  describe("입력 및 버튼 동작 테스트", () => {
    let user: ReturnType<typeof userEvent.setup>;
    let inputs: HTMLInputElement[];
    let addButton: HTMLButtonElement;

    const testValue = "https://discord.gg/test";

    beforeEach(() => {
      renderDynamicInput();
      user = userEvent.setup();
      inputs = screen.getAllByRole("textbox");
      addButton = screen.getByTestId("add-button");
    });

    test("입력 필드에 값을 입력하면 값이 반영된다", async () => {
      await user.type(inputs[0], testValue);
      expect(inputs[0]).toHaveValue(testValue);
    });

    test("추가 버튼을 클릭하면 입력 필드와 삭제 버튼이 추가된다", async () => {
      expect(inputs).toHaveLength(1);

      await user.click(addButton);
      inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(2);

      const removeButton = screen.getByTestId("remove-button-1");
      expect(removeButton).toBeInTheDocument();
    });

    test("삭제 버튼을 클릭하면 입력 필드가 삭제된다", async () => {
      expect(inputs).toHaveLength(1);

      await user.click(addButton);
      inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(2);

      const removeButton = screen.getByTestId("remove-button-1");
      await user.click(removeButton);
      inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(1);
      expect(removeButton).not.toBeInTheDocument();
    });

    test("최대 3개까지 입력 필드를 추가할 수 있다", async () => {
      await user.click(addButton);
      inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(2);

      await user.click(addButton);
      inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(3);

      expect(addButton).toBeDisabled();
      await user.click(addButton);
      expect(inputs).toHaveLength(3);
    });
  });
});
