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
        "border-gray-neutral-100 tb:px-[30px] mo:px-6 tb:py-[38px] mo:py-[37px] flex border border-x-0 border-t border-b-0",
        className
      )}
    >
      <div className="pc:max-w-[1200px] pc:mx-auto flex w-full items-center justify-between">
        <div className="tb:typo-body-md-medium mo:typo-body-sm-medium text-gray-neutral-400">
          © 2025 집콕. Inc
        </div>
        <div className="flex items-center gap-6">
          <Link href="https://www.facebook.com" target="_blank">
            <SocialFacebook className="text-gray-neutral-400 tb:size-6 mo:size-5 hover:text-gray-neutral-500 active:text-gray-neutral-600" />
          </Link>
          <Link href="https://www.x.com/zip-kok/" target="_blank">
            <SocialX className="text-gray-neutral-400 tb:size-6 mo:size-5 hover:text-gray-neutral-500 active:text-gray-neutral-600" />
          </Link>
          <Link href="https://www.instagram.com/zip-kok/" target="_blank">
            <SocialInstagram className="text-gray-neutral-400 tb:size-6 mo:size-5 hover:text-gray-neutral-500 active:text-gray-neutral-600" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
