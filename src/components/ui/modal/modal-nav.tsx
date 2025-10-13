interface ModalNavProps {
  isFirstStep?: boolean;
  isLastStep?: boolean;
  onCancel: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onSubmit: () => void;
}

const ModalNav = ({
  isFirstStep = true,
  isLastStep = true,
  onCancel,
  onPrev,
  onNext,
  onSubmit,
}: ModalNavProps) => {
  return (
    <div className="flex h-15 flex-shrink-0 items-center">
      <div className="flex w-full gap-5">
        {isFirstStep ? (
          <button
            type="button"
            onClick={onCancel}
            className="h-12 flex-1 border border-zinc-800 text-lg font-bold text-black hover:bg-zinc-100"
          >
            취소
          </button>
        ) : (
          <button
            type="button"
            onClick={onPrev}
            className="h-12 flex-1 border border-zinc-800 text-lg font-bold text-black hover:bg-zinc-100"
          >
            이전
          </button>
        )}

        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            className="h-12 flex-1 bg-zinc-800 text-lg font-bold text-white hover:bg-zinc-900"
          >
            완료
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="h-12 flex-1 bg-zinc-800 text-lg font-bold text-white hover:bg-zinc-900"
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalNav;
