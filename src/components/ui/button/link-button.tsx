"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";

interface SeeMoreButtonProps {
  // 이동 경로
  href: string;
  className?: string;
}

const LinkButton = ({ href, className }: SeeMoreButtonProps) => {
  return (
    <Link href={`/gathering/list/${href}`}>
      <div
        className={cn(
          "typo-ui-sm-medium cursor-pointer text-neutral-400 underline",
          className
        )}
      >
        더 보기
      </div>
    </Link>
  );
};

export default LinkButton;
