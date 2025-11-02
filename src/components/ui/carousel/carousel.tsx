"use client";

import ChevronLeftIcon from "@/assets/icons/chevron-left";
import ChevronRightIcon from "@/assets/icons/chevron-right";
import CarouselButton from "@/components/ui/button/carousel-button";
import { useCarousel } from "@/hooks";
import { ListType } from "@/types/carousel";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  totalItemCount: number;
  listType: ListType;
  className?: string;
}

const carouselButtonProps = cva("pc:block absolute hidden", {
  variants: {
    listType: {
      gatheringList: "",
      appointmentList: "",
    },
    direction: {
      left: "",
      right: "",
    },
  },
  compoundVariants: [
    {
      listType: "gatheringList",
      direction: "left",
      class: "top-[98px] left-[-20px]",
    },
    {
      listType: "gatheringList",
      direction: "right",
      class: "top-[98px] right-[-20px]",
    },
    {
      listType: "appointmentList",
      direction: "left",
      class: "top-[65px] left-[-19.5px]",
    },
    {
      listType: "appointmentList",
      direction: "right",
      class: "top-[65px] right-[-19.5px]",
    },
  ],
});

// 캐러셀 UI
const Carousel = ({
  children,
  totalItemCount,
  listType,
  className,
  ...props
}: CarouselProps) => {
  const {
    scrollContainerRef,
    scrollToPrev,
    scrollToNext,
    handleScroll,
    isAtStart,
    isAtEnd,
    showButtons,
  } = useCarousel(listType);

  return (
    <div className={cn("relative h-full w-full", className)} {...props}>
      {/* 스크롤 컨테이너 */}
      {listType === "gatheringList" ? (
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide my-3 overflow-x-auto scroll-smooth py-3"
          onScroll={handleScroll}
        >
          <ul className="flex w-fit flex-row gap-5">{children}</ul>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide overflow-x-auto scroll-smooth"
          onScroll={handleScroll}
        >
          <ul className="flex w-fit flex-row gap-5">{children}</ul>
        </div>
      )}

      {/* 스크롤이 필요할 경우에만 에만 버튼 표시 */}
      {showButtons && (
        <>
          {/* 왼쪽 버튼 */}
          <CarouselButton
            className={carouselButtonProps({
              listType: listType,
              direction: "left",
            })}
            onClick={scrollToPrev}
            disabled={isAtStart}
          >
            <ChevronLeftIcon className="text-gray-neutral-600 group-disabled:text-gray-neutral-300 h-5 w-5 stroke-none" />
          </CarouselButton>

          {/* 오른쪽 버튼 */}
          <CarouselButton
            className={carouselButtonProps({
              listType: listType,
              direction: "right",
            })}
            onClick={scrollToNext}
            disabled={isAtEnd}
          >
            <ChevronRightIcon className="text-gray-neutral-600 group-disabled:text-gray-neutral-300 h-5 w-5 stroke-none" />
          </CarouselButton>
        </>
      )}
    </div>
  );
};

export default Carousel;
