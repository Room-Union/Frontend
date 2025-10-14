"use client";
import SvgLogo from "@/assets/icons-colored/logo";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const pathname = usePathname();
  const isListPage = pathname.includes("/gathering/list");
  const isLogined = false;
  return (
    <header
      className={cn(
        "border-gray-neutral-100 pc:px-90 tb:px-6 mo:px-4 tb:h-20 mo:h-13 flex h-20 items-center border-x-0 border-t-0 border-b bg-white",
        className
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <SvgLogo className="tb:size-12 mo:size-9" />
          </Link>
          <Link
            href="/gathering/list/all"
            className={cn(
              "mo:hidden tb:block p-4 text-base leading-6 font-medium tracking-[-0.32px]",
              isListPage ? "text-blue-600" : "text-gray-neutral-400"
            )}
          >
            모임 리스트
          </Link>
        </div>

        {isLogined ? (
          <Link href="/sign-in">유저 아이콘</Link>
        ) : (
          <Link href="/sign-in">
            <Button variant="outline" size="sm">
              로그인
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
