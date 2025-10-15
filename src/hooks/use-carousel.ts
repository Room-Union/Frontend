"use client";

import { ListType } from "@/types/carousel";
import { useMemo, useCallback, useRef, useState, useEffect } from "react";
import { PC_LAYOUT, MOBILE_LAYOUT, BREAKPOINTS } from "@/constants/constants";

// 캐러셀이 경계값 이내에서 움직이도록 제한하는 함수
const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const useCarousel = (listType: ListType, totalItemCount: number) => {
  // 리스트 참조
  const listRef = useRef<HTMLUListElement>(null);
  // 뷰포트 참조
  const viewportRef = useRef<HTMLDivElement>(null);
  // 관성용 마지막 X 위치 저장
  const lastXPosRef = useRef(0);
  const [offset, setOffset] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  // 터치 시작 위치
  const [touchStartX, setTouchStartX] = useState(0);

  // viewport 너비에 따라 카드 사이즈와 간격 선택
  const { cardSize, gapSize } = useMemo(() => {
    // PC, 태블릿
    if (BREAKPOINTS.tb <= viewportWidth) {
      return {
        cardSize: PC_LAYOUT[listType].CARD_SIZE,
        gapSize: PC_LAYOUT[listType].GAP_SIZE,
      };
      // 모바일
    } else {
      return {
        cardSize: MOBILE_LAYOUT[listType].CARD_SIZE,
        gapSize: MOBILE_LAYOUT[listType].GAP_SIZE,
      };
    }
  }, [viewportWidth, listType]);

  // viewport 변화에 따라 변하는 카드 사이즈와 간격을 고려하여 보이는 사이즈 계산
  const VIEWSIZE = useMemo(() => {
    const cardWithGap = cardSize + gapSize;
    return Math.floor(viewportWidth / cardWithGap) * cardWithGap;
  }, [viewportWidth, cardSize, gapSize]);

  // viewport 변화에 따라 변하는 카드 사이즈와 간격을 고려하여 총 컨텐츠 사이즈 계산
  const CONTENTSIZE = useMemo(() => {
    return (gapSize + cardSize) * totalItemCount - gapSize;
  }, [gapSize, cardSize, totalItemCount]);

  // 캐러셀 경계값 계산
  const { maxOffset, minOffset } = useMemo(() => {
    const maxOffset = 0; // 왼쪽 끝

    // 초기 로딩 시 viewport 너비를 기준으로 왼쪽 끝 경계값 계산 (VIEWSIZE - CONTENTSIZE)
    if (viewportWidth === 0) {
      const calculatedMinOffset = VIEWSIZE - CONTENTSIZE;
      return { maxOffset, minOffset: Math.min(0, calculatedMinOffset) };
    }

    // ( viewport - 총 컨텐츠 사이즈 ) 왼쪽 끝 경계값 계산
    const calculatedMinOffset = viewportWidth - CONTENTSIZE;
    return { maxOffset, minOffset: Math.min(0, calculatedMinOffset) };
  }, [VIEWSIZE, CONTENTSIZE, viewportWidth]);

  // 버튼 클릭 시 스크롤 단위
  const scrollUnit = useMemo(() => VIEWSIZE + (cardSize + gapSize), [VIEWSIZE]);

  // 경계 값 내에서 x만큼 이동하는 함수 (x: 스크롤 단위)
  const scrollItems = useCallback(
    (x: number) => {
      setOffset((prev) => clamp(prev + x, minOffset, maxOffset));
    },
    [minOffset, maxOffset]
  );

  // 오른쪽 스크롤
  const scrollToNext = useCallback(
    () => scrollItems(-scrollUnit),
    [scrollUnit, scrollItems]
  );

  // 왼쪽 스크롤
  const scrollToPrev = useCallback(
    () => scrollItems(scrollUnit),
    [scrollUnit, scrollItems]
  );

  // 캐러셀 왼쪽 끝 값 체크
  const isAtStart = offset >= maxOffset;
  // 캐러셀 오른쪽 끝 값 체크
  const isAtEnd = offset <= minOffset;

  // 터치 시작
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const x = e.touches[0].clientX;
    setTouchStartX(x);
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    // 이동량 = (현재 터치 위치의 X - 터치 시작한 지점의 X)
    const x = e.touches[0].clientX;
    const moveX = x - touchStartX;
    setTouchStartX(x);

    lastXPosRef.current = moveX;
    setOffset((prev) => clamp(prev + moveX, minOffset, maxOffset));
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    // 관성 가속도 값
    const ACCERATION_VALUE = 10;

    setOffset((prev) => {
      return clamp(
        prev + lastXPosRef.current * ACCERATION_VALUE,
        minOffset,
        maxOffset
      );
    });
  };

  // viewport 크기 실시간 감지 및 저장
  useEffect(() => {
    // viewportRef.current가 변경될 때마다 viewport 너비 저장
    const updateViewportWidth = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.offsetWidth);
      }
    };

    // 초기 로딩 시 viewport 너비 저장
    updateViewportWidth();

    // viewportRef.current의 크기 변화를 실시간으로 감지하는 ResizeObserver 설정
    const resizeObserver = new ResizeObserver(updateViewportWidth);
    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    // ResizeObserver 해제
    return () => resizeObserver.disconnect();
  }, []);

  // viewport 크기 변경 시 offset을 새로운 범위 내로 조정
  useEffect(() => {
    setOffset((prevOffset) => clamp(prevOffset, minOffset, maxOffset));
  }, [minOffset, maxOffset]);

  // DOM에 wheel 이벤트 리스너 추가하여 passive: false로 세로 스크롤 방지
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // shift 눌렀을 때 캐러셀 이동
      if (e.shiftKey) {
        e.preventDefault();
        const scrollAmount = e.deltaX;
        if (scrollAmount) scrollItems(-scrollAmount);
      }
    };

    if (viewportRef.current) {
      viewportRef.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (viewportRef.current) {
        viewportRef.current.removeEventListener("wheel", handleWheel);
      }
    };
    // 의존성 관리
  }, [scrollItems]);

  //TODO intersection observer - lazy render적용

  return {
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
  };
};

export default useCarousel;
