"use client";
import useSignOut from "@/apis/auth/mutation/use-sign-out";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { Button, Dropdown, Profile } from "@/components/ui";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

interface AuthStatusButtonProps {
  className?: string;
}

const AuthStatusButton = ({ className }: AuthStatusButtonProps) => {
  const { data: user } = useGetUserInfo();
  const router = useRouter();
  const { mutate: signOut } = useSignOut();
  const isSignedIn = useAuthStore((state) => state.authStatus);

  if (isSignedIn) {
    return (
      user && (
        <Dropdown
          trigger={
            <Profile
              profileImageUrl={user?.profileImageUrl}
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
              onClick: signOut,
            },
          ]}
          itemClassName="hover:text-gray-neutral-700 text-gray-neutral-500 justify-center"
          contentAlign="end"
        />
      )
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
