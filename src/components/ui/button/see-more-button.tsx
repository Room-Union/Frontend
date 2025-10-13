'use client'

import { cn } from "@/utils/cn";

interface SeeMoreButtonProps {
  // 이동 경로
  href: string;
}

const SeeMoreButton = ({ href, className }: SeeMoreButtonProps & { className?: string }) => {
  const handleClick = () => { }

  return (
    <button
      onClick={handleClick}
      className={cn("typo-ui-sm-medium text-neutral-400 underline cursor-pointer", className)}
    >
      더 보기
    </button>
  )
}

export default SeeMoreButton;