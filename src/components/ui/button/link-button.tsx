import { cn } from "@/utils/cn";
import Link from "next/link";

interface LinkButtonProps {
  // 이동 경로
  href: string;
  className?: string;
  text?: string;
}

const LinkButton = ({ href, className, text = "더보기" }: LinkButtonProps) => {
  const isAuth = href === "/sign-in" || href === "/sign-up";
  return (
    <Link href={isAuth ? href : `/gathering/list/${href}`}>
      <div
        className={cn(
          `tb:typo-ui-sm-medium typo-ui-xs-medium cursor-pointer ${isAuth ? "text-blue-600" : "text-neutral-400"} underline`,
          className
        )}
      >
        {text}
      </div>
    </Link>
  );
};

export default LinkButton;
