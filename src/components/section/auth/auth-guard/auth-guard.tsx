"use client";
import { getAccessToken } from "@/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

    if (!token && !isAuthPage) {
      router.replace("/sign-in");
    } else if (token && isAuthPage) {
      router.replace("/my-page");
    } else {
      setChecking(false);
    }
  }, [pathname, router]);

  if (checking)
    return (
      <div className="p-10 text-center text-gray-500">인증 확인 중...</div>
    );

  return <>{children}</>;
}

export default AuthGuard;
