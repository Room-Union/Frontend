"use client";

import { useEffect, useState } from "react";

interface UseTimerProps {
  initialSeconds: number;
}

const useTimer = ({ initialSeconds }: UseTimerProps) => {
  const [time, setTime] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const extendTime = (extendSeconds: number) => {
    setTime((prev) => prev + extendSeconds);
  };

  return { time, extendTime };
};

export default useTimer;
