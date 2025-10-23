import SvgMenu from "@/assets/icons/menu";
import { cn } from "@/utils/cn";

interface HamburgerMenuButtonProps {
  className?: string;
  onClick: () => void;
}

const HamburgerMenuButton = ({
  className,
  onClick,
}: HamburgerMenuButtonProps) => {
  return (
    <button className={cn("cursor-pointer", className)} onClick={onClick}>
      <SvgMenu className="size-6 text-slate-600" />
    </button>
  );
};

export default HamburgerMenuButton;
