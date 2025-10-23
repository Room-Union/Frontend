"use client";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { Button, Dropdown, Profile } from "@/components/ui";
import useLogout from "@/hooks/use-logout";
import { checkIsSignedIn } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface AuthStatusButtonProps {
  className?: string;
}

const AuthStatusButton = ({ className }: AuthStatusButtonProps) => {
  const isSignedIn = checkIsSignedIn();
  const { data } = useGetUserInfo();
  const router = useRouter();
  const { handleLogout } = useLogout();
  const handleDropDown = (value: string) => {
    switch (value) {
      case "mypage":
        router.push("/my-page");
        break;
      case "signout":
        handleLogout();
        break;
    }
  };
  if (isSignedIn && data) {
    return (
      <Dropdown
        onValueChange={handleDropDown}
        trigger={
          <button className="mo:hidden tb:block outline-none">
            <Profile
              gender={data?.gender}
              profileImageUrl={data?.profileImageUrl}
              size="sm"
            />
          </button>
        }
        selectItems={[
          {
            value: "mypage",
            text: "마이페이지",
          },
          {
            value: "signout",
            text: "로그아웃",
          },
        ]}
        dropDown
        contentAlign="end"
        dropDownClassName="typo-ui-md-semibold text-gray-neutral-500 hover:text-gray-neutral-700"
        size="md"
      />
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

{
  /* <Profile
gender={data?.gender}
profileImageUrl={data?.profileImageUrl}
size="sm"
/> */
}
