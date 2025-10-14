"use client";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { Button, Profile } from "@/components/ui";
import { checkIsSignedIn } from "@/utils/auth";
import Link from "next/link";

const AuthStatusButton = () => {
  const isSignedIn = checkIsSignedIn();
  const { data } = useGetUserInfo();
  console.log(isSignedIn);
  if (isSignedIn && data) {
    return (
      <Link href="/my-page">
        <Profile
          gender={data?.gender}
          profileImageUrl={data?.profileImageUrl}
          size="sm"
        />
      </Link>
    );
  } else {
    return (
      <Button variant="outline" size="sm" href="/sign-in">
        로그인
      </Button>
    );
  }
};

export default AuthStatusButton;
