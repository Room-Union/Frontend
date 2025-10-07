interface ModalNavProps {
  currentStepIndex: number;
  handleCancel: () => void;
  handlePrev: () => void;
  handleNext: () => void;
  steps: string[];
}

const ModalNav = ({
  currentStepIndex,
  handleCancel,
  handlePrev,
  handleNext,
  steps,
}: ModalNavProps) => {
  return (
    <div className="flex h-28 flex-shrink-0 items-center bg-stone-50 px-8">
      <div className="flex w-full gap-5">
        {currentStepIndex === 0 ? (
          <button
            type="button"
            onClick={handleCancel}
            className="h-12 flex-1 border border-zinc-800 text-lg font-bold text-black hover:bg-zinc-100"
          >
            취소
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePrev}
            className="h-12 flex-1 border border-zinc-800 text-lg font-bold text-black hover:bg-zinc-100"
          >
            이전
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="h-12 flex-1 bg-zinc-800 text-lg font-bold text-white hover:bg-zinc-900"
        >
          {currentStepIndex === steps.length - 1 ? "완료" : "다음"}
        </button>
      </div>
    </div>
  );
};

export default ModalNav;
