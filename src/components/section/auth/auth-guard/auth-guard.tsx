"use client";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { Spinner } from "@/components/ui";
import { getAccessToken } from "@/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const { data, isLoading } = useGetUserInfo();

  useEffect(() => {
    const token = getAccessToken();
    const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

    // isLoading 상태 : 로딩 상태 유지
    if (isLoading) {
      return;
    }

    if (!token && !isAuthPage) {
      router.replace("/sign-in");
    } else if (token && isAuthPage) {
      if (data) router.replace("/");
    } else if (checking) {
      setChecking(false);
    }
  }, [pathname, router, data, isLoading]);

  if (checking || isLoading)
    return (
      <div className="typo-ui-xs-medium tb:typo-ui-md-medium text-gray-neutral-400 flex h-full min-h-screen w-full flex-col items-center justify-center gap-5">
        <Spinner variant={"outline"} size={"page"} />
        로딩 중 입니다...
      </div>
    );

  return <>{children}</>;
}

export default AuthGuard;
