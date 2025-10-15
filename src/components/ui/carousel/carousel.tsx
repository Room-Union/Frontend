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
      class: "top-[36px] left-[-44.5px]",
    },
    {
      listType: "scheduleList",
      direction: "right",
      class: "top-[36px] right-[-44.5px]",
    },
  ],
});

// 캐러셀 UI 컴포넌트P
const Carousel = ({
  children,
  totalItemCount,
  listType,
  className,
  ...props
}: CarouselProps) => {
  const {
    listRef,
    viewportRef,
    offset,
    isAtStart,
    isAtEnd,
    scrollToNext,
    scrollToPrev,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = useCarousel(listType, totalItemCount);

  return (
    <div
      className={cn("relative h-full w-[calc(100%-30px)]", className)}
      {...props}
    >
      {/* 모임 리스트 */}
      <div
        ref={viewportRef}
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        <ul
          ref={listRef}
          className="no-scrollbar flex flex-row gap-5"
          style={{
            transform: `translateX(${offset}px)`,
            transition: "transform 300ms ease",
          }}
        >
          {children}
        </ul>
      </div>

      {/* 왼쪽 버튼 */}
      <CarouselButton
        disabled={isAtStart}
        className={carouselButtonProps({
          listType: listType,
          direction: "left",
        })}
        onClick={scrollToPrev}
      >
        <ChevronLeftIcon className="text-gray-neutral-600 group-disabled:text-gray-neutral-300 h-4 w-4" />
      </CarouselButton>

      {/* 오른쪽 버튼 */}
      <CarouselButton
        disabled={isAtEnd}
        className={carouselButtonProps({
          listType: listType,
          direction: "right",
        })}
        onClick={scrollToNext}
      >
        <ChevronRightIcon className="text-gray-neutral-600 group-disabled:text-gray-neutral-300 h-4 w-4" />
      </CarouselButton>
    </div>
  );
};

export default Carousel;
