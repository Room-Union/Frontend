import SvgMenu from "@/assets/icons/menu";
import { cn } from "@/utils/cn";

interface HamburgerMenuButtonProps {
  className?: string;
}

const HamburgerMenuButton = ({ className }: HamburgerMenuButtonProps) => {
  return (
    <button className={cn("cursor-pointer", className)} onClick={() => {}}>
      <SvgMenu className="size-6 text-slate-600" />
    </button>
  );
};

export default HamburgerMenuButton;
