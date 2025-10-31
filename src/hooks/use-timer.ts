"use client";

import { useEffect, useState } from "react";

interface UseTimerProps {
  initialSeconds: number;
  onEnd?: () => void;
}

const useTimer = ({ initialSeconds, onEnd }: UseTimerProps) => {
  const [time, setTime] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (time === 0) onEnd?.();
  }, [time, onEnd]);

  const extendTime = (extendSeconds: number) => {
    setTime((prev) => prev + extendSeconds);
  };

  return { time, extendTime };
};

export default useTimer;
