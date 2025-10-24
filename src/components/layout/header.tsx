"use client";
import SvgLogo from "@/assets/icons-colored/logo";
import useSideMenuStore from "@/store/side-menu-store";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { AuthStatusButton, GnbTabButton, HamburgerMenuButton } from "../ui";
import SideMenu from "../ui/side-menu/side-menu";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { toggleSideMenu } = useSideMenuStore();
  return (
    <>
      <header
        className={cn(
          "border-gray-neutral-100 tb:px-6 mo:px-4 tb:h-20 mo:h-13 flex h-20 items-center border-x-0 border-t-0 border-b bg-white",
          className
        )}
      >
        <div className="pc:max-w-[1200px] pc:mx-auto flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="cursor-pointer">
              <SvgLogo className="tb:size-12 mo:size-9" />
            </Link>
            <GnbTabButton
              href="/gathering/list?category=all&sort=latest"
              className="mo:hidden tb:flex"
            >
              모임 리스트
            </GnbTabButton>
          </div>
          <AuthStatusButton className="tb:flex hidden" />
          <HamburgerMenuButton
            className="tb:hidden flex"
            onClick={toggleSideMenu}
          />
        </div>
      </header>
      <SideMenu />
    </>
  );
};

export default Header;
