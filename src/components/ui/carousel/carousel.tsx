"use client";

import { cn } from "@/utils/cn";
import { useCarousel } from "@/hooks";
import CarouselButton from "@/components/ui/button/carousel-button";
import ChevronRightIcon from "@/assets/icons/chevron-right";
import ChevronLeftIcon from "@/assets/icons/chevron-left";
import { ListType } from "@/types/carousel";
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
      scheduleList: "",
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
      class: "top-[77px] left-[-30px]",
    },
    {
      listType: "gatheringList",
      direction: "right",
      class: "top-[77px] right-[-30px]",
    },
    {
      listType: "scheduleList",
      direction: "left",
      class: "top-[55px] left-[-44.5px]",
    },
    {
      listType: "scheduleList",
      direction: "right",
      class: "top-[55px] right-[-44.5px]",
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
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide overflow-x-auto overscroll-contain scroll-smooth"
        onScroll={handleScroll}
      >
        <ul className="flex flex-row gap-5">{children}</ul>
      </div>

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
            <ChevronLeftIcon className="text-gray-neutral-600 group-disabled:text-gray-neutral-300 h-4 w-4" />
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
            <ChevronRightIcon className="text-gray-neutral-600 group-disabled:text-gray-neutral-300 h-4 w-4" />
          </CarouselButton>
        </>
      )}
    </div>
  );
};

export default Carousel;
