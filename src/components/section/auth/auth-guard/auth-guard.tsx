"use client";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { Spinner } from "@/components/ui";
import { PATHS } from "@/constants/constants";
import { getAccessToken, removeAccessToken } from "@/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const { data, isLoading, isError } = useGetUserInfo();

  useEffect(() => {
    const token = getAccessToken();
    const isAuthPage = pathname === PATHS.SIGN_IN || pathname === PATHS.SIGN_UP;

    if (isLoading && !isError) {
      return;
    }

    if (!token) {
      if (!isAuthPage) router.replace(PATHS.SIGN_IN);
      else if (checking) setChecking(false);
      return;
    }

    if (token) {
      if (isAuthPage) {
        if (data) router.replace(PATHS.MAIN);
        else if (isError) removeAccessToken();
      } else if (checking) setChecking(false);
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
