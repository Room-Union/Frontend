import Button from "../button/button";

interface ModalNavProps {
  isFirstStep?: boolean;
  isLastStep?: boolean;
  onCancel: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onSubmit: () => void;
  completeButtonText?: string;
  disabled?: boolean;
}

const ModalNav = ({
  isFirstStep = true,
  isLastStep = true,
  onCancel,
  onPrev,
  onNext,
  onSubmit,
  completeButtonText = "완료",
  disabled = false,
}: ModalNavProps) => {
  return (
    <div className="mo:gap-3 tb:gap-4 tb:mb-10 mo:mb-5 flex w-full">
      {isFirstStep ? (
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          size="md"
          className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:w-full tb:max-w-[474px] tb:h-[60px]"
        >
          취소
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onPrev}
          variant="secondary"
          size="md"
          className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:w-full tb:max-w-[474px] tb:h-[60px]"
        >
          이전
        </Button>
      )}

      {isLastStep ? (
        <Button
          type="button"
          onClick={onSubmit}
          variant="primary"
          size="md"
          disabled={disabled}
          className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:w-full tb:max-w-[474px] tb:h-[60px]"
        >
          {completeButtonText}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onNext}
          variant="primary"
          size="md"
          disabled={disabled}
          className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:w-full tb:max-w-[474px] tb:h-[60px]"
        >
          다음
        </Button>
      )}
    </div>
  );
};

export default ModalNav;
