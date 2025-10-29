"use client";

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

    const observer = new IntersectionObserver(
      // callBack
      (entries) => {
        entries.forEach((entry) => {
          // 요소가 뷰포트에 들어왔을때 true, 아니면 false
          setIsInView(entry.isIntersecting);
        });
      },
      //options
      {
        // 요소의 범위를 400px 확장.
        rootMargin: "0px",
        // 타겟이 관찰되기 시작하자마자 옵저버
        threshold: 0,
      }
    );

    // 요소 관찰 시작
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  // targetRef와 isInView
  return { targetRef, isInView };
};

export default useInView;
