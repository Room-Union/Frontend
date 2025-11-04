"use client";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { Button, Dropdown, Profile } from "@/components/ui";
import useLogout from "@/hooks/use-logout";
import { checkIsSignedIn } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

interface AuthStatusButtonProps {
  className?: string;
}

const AuthStatusButton = ({ className }: AuthStatusButtonProps) => {
  const isSignedIn = checkIsSignedIn();
  const { data } = useGetUserInfo();
  const router = useRouter();
  const handleLogout = useLogout();

  if (isSignedIn && data) {
    return (
      <Dropdown
        trigger={
          <Profile
            profileImageUrl={data?.profileImageUrl}
            className={className}
            size="sm"
          />
        }
        items={[
          {
            text: "마이페이지",
            onClick: () => router.push("/my-page"),
          },
          {
            text: "로그아웃",
            onClick: handleLogout,
          },
        ]}
        itemClassName="hover:text-gray-neutral-700 text-gray-neutral-500 justify-center"
        contentAlign="end"
      />
    );
  } else {
    return (
      <Button
        variant="outline"
        size="sm"
        href="/sign-in"
        className={cn("w-fit", className)}
      >
        로그인
      </Button>
    );
  }
};

export default AuthStatusButton;
