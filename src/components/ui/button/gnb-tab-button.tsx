"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface GnbTabButtonProps {
  href: {
    pathname: string;
    query: Record<string, string>;
  };
  children: React.ReactNode;
  className?: string;
}

const GnbTabButton = ({ href, children, className }: GnbTabButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href.pathname;
  return (
    <Link
      href={href}
      className={cn(
        "typo-body-md-medium flex h-12 cursor-pointer items-center px-4",
        className,
        isActive ? "text-blue-600" : "text-gray-neutral-400"
      )}
    >
      {children}
    </Link>
  );
};

export default GnbTabButton;
