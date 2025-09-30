import CATEGORIES from "@/constants/categories";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";

const GatheringModal = () => {
  return (
    <Dialog.Root>
      {/* Modal Trigger */}
      <Dialog.Trigger asChild>
        <button className="h-11 w-32 cursor-pointer bg-zinc-800 font-bold text-white">
          모임 만들기
        </button>
      </Dialog.Trigger>

      {/* Modal Portal */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[95vh] w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white">
          {/* description: VisuallyHidden는 스크린 리더의 접근을 허용, 화면에서는 숨겨줌 */}
          <VisuallyHidden>
            <Dialog.Title>모임 생성</Dialog.Title>
            <Dialog.Description>모임 생성 모달</Dialog.Description>
          </VisuallyHidden>

          {/* Modal Content */}
          <div className="flex h-full max-h-[90vh] w-full flex-col bg-white">
            {/* Modal Header Section */}
            <div className="flex flex-shrink-0 items-center justify-between bg-stone-50 px-8 py-6">
              <h2 className="text-2xl font-bold text-black">모임 생성</h2>
              <Dialog.Close asChild>
                <button className="cursor-pointer text-3xl text-stone-500 hover:text-stone-700">
                  x
                </button>
              </Dialog.Close>
            </div>

            {/* Modal Form Section */}
            <form className="flex flex-1 flex-col space-y-8 overflow-y-auto p-8">
              {/* Title */}
              <div className="space-y-3">
                <label className="block text-base font-bold text-black">
                  모임 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="모임 이름을 입력하세요"
                  className="h-12 w-full border-none bg-neutral-100 px-5 text-neutral-500 outline-none"
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="block text-base font-bold text-black">
                  모임 설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="모임에 대한 상세한 설명을 입력하세요"
                  rows={4}
                  className="h-36 w-full resize-none border-none bg-neutral-100 px-5 py-4 text-neutral-500 outline-none"
                />
              </div>

              {/* Image */}
              <div className="space-y-3">
                <label className="block text-base font-bold text-black">
                  관련 이미지 <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <div className="flex h-24 w-40 items-center justify-center bg-neutral-200">
                    <span className="text-sm text-stone-500">
                      [사진 미리보기]
                    </span>
                  </div>
                  <input
                    type="file"
                    name="image"
                    className="bg-neutral-200 px-7 py-3 text-base text-black hover:bg-neutral-300"
                  />
                </div>
              </div>

              {/* Max Member Count */}
              <div className="space-y-3">
                <label className="block text-base font-bold text-black">
                  최대 인원 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    name="maxMemberCount"
                    type="number"
                    className="h-12 w-28 border-none bg-neutral-100 px-5 text-black outline-none"
                  />
                  <span className="text-base text-zinc-800">명</span>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <label className="block text-base font-bold text-black">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-5">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      className="h-14 cursor-pointer bg-zinc-100 px-4 font-medium text-black hover:bg-zinc-200"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            {/* Modal Button Section */}
            <div className="flex h-28 flex-shrink-0 items-center bg-stone-50 px-8">
              <div className="flex w-full gap-5">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="h-12 flex-1 border border-zinc-800 text-lg font-bold text-black hover:bg-zinc-100"
                  >
                    취소
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className="h-12 flex-1 bg-zinc-800 text-lg font-bold text-white hover:bg-zinc-900"
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GatheringModal;
