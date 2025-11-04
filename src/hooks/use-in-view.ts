"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseInViewReturn {
  // DOM 요소에 연결할 ref (콜백 ref)
  targetRef: (node: HTMLDivElement | null) => void;
  // 요소가 뷰포트에 들어왔는지 여부
  isInView: boolean;
}

const useInView = (): UseInViewReturn => {
  // 참조할 DOM 요소에 연결할 ref
  const ref = useRef<HTMLDivElement | null>(null);
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  const targetRef = useCallback((node: HTMLDivElement | null) => {
    // 기존 요소가 있으면 먼저 정리
    if (ref.current) {
      ref.current = null;
    }
    ref.current = node;
    setElement(node);
  }, []);

  useEffect(() => {
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
        threshold: 1,
      }
    );

    // 요소 관찰 시작
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [element]); // element가 변경될 때마다 실행

  // targetRef와 isInView
  return { targetRef, isInView };
};

export default useInView;
