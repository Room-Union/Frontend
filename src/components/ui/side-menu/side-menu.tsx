import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import useLogout from "@/hooks/use-logout";
import useSideMenuStore from "@/store/side-menu-store";
import { checkIsSignedIn } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Profile from "../profile/profile";

const SideMenu = () => {
  const { data } = useGetUserInfo();
  const { isOpen, toggleSideMenu } = useSideMenuStore();
  const router = useRouter();
  const isSignedIn = checkIsSignedIn() && data;
  const { handleLogout } = useLogout();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClick = (href: string) => {
    router.push(href);
    toggleSideMenu();
  };

  return (
    <>
      {isOpen && (
        <div
          className="tb:hidden side-menu-overlay bg-base-black-a-400 fixed inset-0 z-40"
          onClick={toggleSideMenu}
        />
      )}
      <nav
        className={cn(
          "tb:hidden side-menu-content fixed top-0 right-0 z-50 flex h-full w-[243px] transform flex-col justify-between rounded-tl-[20px] rounded-bl-[20px] bg-white px-5 pt-5 pb-7.5 shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="border-gray-neutral-100 flex items-center gap-[6px] border-b px-1 py-[14px]">
            {isSignedIn && (
              <Profile profileImageUrl={data.profileImageUrl} size="sm" />
            )}
            <div className="flex flex-col justify-between gap-0.5">
              <p className="typo-ui-lg-semibold max-w-[135px] truncate">
                {isSignedIn ? `${data?.nickname} 님` : "로그인해주세요"}
              </p>
              <button
                onClick={() =>
                  isSignedIn ? handleClick("/my-page") : handleClick("/sign-in")
                }
                className="typo-ui-xs-medium cursor-pointer py-1 text-start text-neutral-400 underline"
              >
                {isSignedIn ? "마이페이지" : "로그인/회원가입"}
              </button>
            </div>
          </div>
          <button
            className="typo-ui-md-semibold h-11 cursor-pointer px-3 py-2 text-start"
            onClick={() =>
              handleClick("/gathering/list?category=all&sort=latest")
            }
          >
            모임 리스트
          </button>
        </div>

        {isSignedIn && (
          <button
            className="typo-ui-sm-semibold text-gray-neutral-500 border-gray-neutral-200 w-full cursor-pointer rounded-[10px] border px-4 py-2.5"
            onClick={() => {
              handleLogout();
              toggleSideMenu();
            }}
          >
            로그아웃
          </button>
        )}
      </nav>
    </>
  );
};

export default SideMenu;
