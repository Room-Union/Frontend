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
        "border-gray-neutral-100 tb:h-25 mo:h-[94px] pc:px-90 tb:px-[30px] mo:px-6 tb:py-[38px] mo:py-[37px] flex border border-x-0 border-t border-b-0",
        className
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="tb:typo-body-md-medium mo:typo-body-sm-medium text-gray-neutral-400">
          © 2025 집콕. Inc
        </div>
        <div className="flex items-center gap-6">
          <Link href="https://www.facebook.com">
            <SocialFacebook className="text-gray-neutral-400 tb:size-6 mo:size-5" />
          </Link>
          <Link href="https://www.x.com">
            <SocialX className="text-gray-neutral-400 tb:size-6 mo:size-5" />
          </Link>
          <Link href="https://www.instagram.com">
            <SocialInstagram className="text-gray-neutral-400 tb:size-6 mo:size-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
