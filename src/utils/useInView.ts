import { useEffect, useRef, useState } from "react";

interface UseInViewReturn {
  // DOM 요소에 연결할 ref
  targetRef: React.RefObject<HTMLDivElement | null>;
  // 요소가 뷰포트에 들어왔는지 여부
  isInView: boolean;
}

const useInView = (): UseInViewReturn => {
  // 참조할 DOM 요소에 연결할 ref
  const targetRef = useRef<HTMLDivElement>(null);
  // 요소가 뷰포트에 있는지 여부
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = targetRef.current;
    // ref가 아직 연결되지 않았으면 종료
    if (!element) return;

    // rootMargin: 600픽셀 이내에 있으면 감지
    const rootMargin = 400;

    // 요소가 뷰포트 들어왔는지 확인
    const checkInView = () => {
      // 요소의 하단 좌표 = 맨 위로부터 기준으로부터 떨어진 위치 + targetRef 요소의 높이
      const elementBottom = element.offsetTop + element.offsetHeight;
      // 현재 화면의 하단좌표 = 스크롤양 + 브라우저의 뷰포트 높이(innerHeight) || (IE의 경우)document.documentElement.clientHeight
      const windowBottom =
        window.scrollY +
        (window.innerHeight || document.documentElement.clientHeight);

      // 현재 화면 하단 + 마진값이 요소의 위치보다 크거나 같으면 isVisible 업데이트
      const isVisible = windowBottom + rootMargin >= elementBottom;

      setIsInView(isVisible);
    };

    checkInView();

    // 스크롤 이벤트 발생 시 checkInView 함수 실행
    window.addEventListener("scroll", checkInView);
    // 윈도우 크기 변경 시 checkInView 함수 실행
    window.addEventListener("resize", checkInView);

    // useEffect의 cleanup 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", checkInView);
      window.removeEventListener("resize", checkInView);
    };
  }, []);

  // targetRef와 isInView
  return { targetRef, isInView };
};

export default useInView;
