"use client";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { Button, Profile } from "@/components/ui";
import { checkIsSignedIn } from "@/utils/auth";
import Link from "next/link";

interface AuthStatusButtonProps {
  className?: string;
}

const AuthStatusButton = ({ className }: AuthStatusButtonProps) => {
  const isSignedIn = checkIsSignedIn();
  const { data } = useGetUserInfo();
  if (isSignedIn && data) {
    return (
      <Link href="/my-page" className={className}>
        <Profile
          gender={data?.gender}
          profileImageUrl={data?.profileImageUrl}
          size="sm"
        />
      </Link>
    );
  } else {
    return (
      <Button variant="outline" size="sm" href="/sign-in" className={className}>
        로그인
      </Button>
    );
  }
};

export default AuthStatusButton;
