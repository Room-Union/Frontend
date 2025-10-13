'use client'

import { cn } from "@/utils/cn";
import Link from "next/link";

interface SeeMoreButtonProps {
  // 이동 경로
  href: string;
  className?: string;
}

const SeeMoreButton = ({ href, className }: SeeMoreButtonProps) => {
  return (
    <Link
      href={`/gathering/list/${href}`}>
      <div className={cn("typo-ui-sm-medium text-neutral-400 underline cursor-pointer", className)}>
        더 보기
      </div>
    </Link>
  )
}

export default SeeMoreButton;