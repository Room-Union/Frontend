"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui";

const Header = () => {
  const pathname = usePathname();
  const isListPage = pathname.includes("/gathering/list");
  const isLogined = false;
  return (
    <header className="border-gray-neutral-100 flex h-20 items-center border-x-0 border-t-0 border-b">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold">
            집콕
          </Link>
          <Link
            href="/gathering/list/all"
            className={cn(
              "p-4 text-base leading-6 font-medium tracking-[-0.32px]",
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
