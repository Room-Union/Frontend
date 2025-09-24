// src/providers/MSWComponent.tsx

"use client";

import { initMocks } from "@/mocks";
import { useEffect, useState } from "react";

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);
  useEffect(() => {
    const init = async () => {
      await initMocks();
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) {
    return null;
  }
  return <>{children}</>;
};
