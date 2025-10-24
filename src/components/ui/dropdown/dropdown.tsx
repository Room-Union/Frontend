import { cn } from "@/utils/cn";
import { DropdownMenu } from "radix-ui";

interface DropdownProps {
  trigger: React.ReactNode;
  items: { icon?: React.ReactNode; text: string; onClick?: () => void }[];
  contentAlign: "start" | "end" | "center";
  itemClassName?: string;
  contentClassName?: string;
  alignOffset?: number;
  sideOffset?: number;
}

const Dropdown = ({
  trigger,
  items,
  contentAlign,
  itemClassName,
  alignOffset = -10,
  sideOffset = 10,
}: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="cursor-pointer outline-none">
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={contentAlign}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
          className="border-gray-neutral-200 rounded-xl border bg-white p-2.5 shadow-[0_3px_6px_0_rgba(0,0,0,0.10)]"
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.text}
              onClick={item.onClick}
              className={cn(
                "typo-ui-md-semibold hover:bg-gray-neutral-50 flex cursor-pointer items-center gap-1.5 self-stretch rounded-lg bg-white px-3 py-3 outline-none",
                itemClassName
              )}
            >
              {item.icon}
              {item.text}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
