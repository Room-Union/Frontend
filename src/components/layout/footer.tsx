import { SocialFacebook, SocialInstagram, SocialX } from "@/assets/icons";
import { cn } from "@/utils/cn";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "border-gray-neutral-100 flex h-25 border border-x-0 border-t border-b-0 px-[107px] py-[26px]",
        className
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="text-gray-neutral-400 text-[16px] leading-[23px] font-medium tracking-[-0.4px]">
          © 2025 집콕. Inc
        </div>
        <div className="flex items-center gap-6">
          <Link href="https://www.facebook.com">
            <SocialFacebook className="h-6 w-6" />
          </Link>
          <Link href="https://www.x.com">
            <SocialX className="h-6 w-6" />
          </Link>
          <Link href="https://www.instagram.com">
            <SocialInstagram className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
