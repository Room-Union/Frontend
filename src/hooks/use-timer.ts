"use client";

import { useEffect, useRef } from "react";

export default function useTimer({
  initialSeconds,
  onEnd,
  onTimeChange,
}: {
  initialSeconds: number;
  onEnd?: () => void;
  onTimeChange?: (seconds: number) => void;
}) {
  const timeRef = useRef(initialSeconds);

  useEffect(() => {
    onTimeChange?.(timeRef.current);

    const id = setInterval(() => {
      timeRef.current -= 1;
      onTimeChange?.(timeRef.current);
      if (timeRef.current === 0) {
        clearInterval(id);
        onEnd?.();
      }
    }, 1000);

    return () => clearInterval(id);
  }, [onEnd, onTimeChange]);

  const extendTime = (extraSeconds: number) => {
    timeRef.current += extraSeconds;
    onTimeChange?.(timeRef.current);
  };

  return { extendTime };
}
