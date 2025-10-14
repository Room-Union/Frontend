"use client";
import SvgLogo from "@/assets/icons-colored/logo";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { AuthStatusButton, GnbTabButton } from "../ui";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "border-gray-neutral-100 pc:px-90 tb:px-6 mo:px-4 tb:h-20 mo:h-13 flex h-20 items-center border-x-0 border-t-0 border-b bg-white",
        className
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="cursor-pointer">
            <SvgLogo className="tb:size-12 mo:size-9" />
          </Link>
          <GnbTabButton
            href="/gathering/list/all"
            className="mo:hidden tb:flex"
          >
            모임 리스트
          </GnbTabButton>
        </div>
        <AuthStatusButton />
      </div>
    </header>
  );
};

export default Header;
