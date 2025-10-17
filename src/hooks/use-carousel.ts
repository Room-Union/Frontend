"use client";

import type React from "react";
import { ListType } from "@/types/carousel";
import { PC_LAYOUT } from "@/constants/constants";
import { useState, useRef, useEffect, useCallback } from "react";

const useCarousel = (listType: ListType) => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  // 화면용 오프셋
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const pcCardSize = PC_LAYOUT[listType].CARD_SIZE;
  const pcGapSize = PC_LAYOUT[listType].GAP_SIZE;
  const cardCount = PC_LAYOUT[listType].CARD_COUNT;

  // 버튼 클릭 시 스크롤 단위
  const scrollUnit = (pcCardSize + pcGapSize) * cardCount;

  // 오른쪽 스크롤
  const scrollToNext = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: scrollUnit, behavior: "smooth" });
  };

  // 왼쪽 스크롤
  const scrollToPrev = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: -scrollUnit, behavior: "smooth" });
  };

  // 캐러셀 버튼 상태 업데이트 조건 = 1. 초기 마운트, 2. 컨테이너 크기 변화 3. 스크롤 이벤트 발생
  const updateButtonStatus = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      setIsAtStart(true);
      setIsAtEnd(true);
      setShowButtons(false);
      return;
    }

    // 스크롤 위치 계산
    const left = container.scrollLeft;
    // 컨테이너 스크롤 너비 - 컨텐츠 너비 계산
    const maxLeft = Math.max(0, container.scrollWidth - container.clientWidth);

    // 스크롤이 필요한지 확인
    const checkScrollNecessary = container.scrollWidth > container.clientWidth;

    setIsAtStart(left <= 0);
    setIsAtEnd(left >= maxLeft);
    setShowButtons(checkScrollNecessary);
  }, []);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(
    (
      e: React.UIEvent<HTMLDivElement> | React.TouchEvent<HTMLButtonElement>
    ) => {
      updateButtonStatus();
    },
    [updateButtonStatus]
  );

  // 컨테이너 크기 변화 감지
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 초기 버튼 업데이트
    updateButtonStatus();

    // ResizeObserver로 컨테이너 크기 변화 감지
    const resizeObserver = new ResizeObserver(() => {
      updateButtonStatus();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateButtonStatus]);

  //TODO intersection observer - lazy render 구현

  return {
    scrollContainerRef,
    scrollToNext,
    scrollToPrev,
    handleScroll,
    isAtStart,
    isAtEnd,
    showButtons,
  };
};

export default useCarousel;
