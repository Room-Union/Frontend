"use client";

import { ArrowDown } from "@/assets/icons";
import { cn } from "@/utils/cn";
import * as Select from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { ReactNode, useState } from "react";

const dropdownVariants = cva(
  "flex w-fit items-center justify-between outline-none cursor-pointer hover:bg-gray-neutral-100 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        lg: "gap-[6px] px-3 py-2 rounded-2xl",
        md: "gap-1 px-3 py-2 rounded-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const dropdownTextVariants = cva(
  "text-gray-neutral-900 hover:text-gray-neutral-600 disabled:hover:text-gray-neutral-300",
  {
    variants: {
      size: {
        lg: "typo-ui-2xl-bold",
        md: "mo:typo-ui-sm-medium tb:typo-ui-md-medium",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const dropdownIconVariants = cva(
  "transition-transform text-gray-neutral-900 hover:text-gray-neutral-600 disabled:hover:text-gray-neutral-300",
  {
    variants: {
      size: {
        lg: "size-5",
        md: "size-[14px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const dropdownContentVariants = cva(
  "border-gray-neutral-200 flex w-fit flex-col items-start justify-center gap-3 rounded-2xl border-1 bg-white shadow-[0_3px_6px_0_rgba(0,0,0,0.10)]",
  {
    variants: {
      size: {
        lg: "mo:px-2.5 mo:py-3 tb:px-3 tb:py-4 rounded-2xl",
        md: "rounded-xl p-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const dropdownItemVariants = cva(
  "tb:p-2 tb:gap-2.5 mo:gap-2 mo:p-2 typo-ui-md-medium group flex w-fit cursor-pointer items-center justify-start bg-white outline-none",
  {
    variants: {
      size: {
        lg: "rounded-2xl",
        md: "rounded-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const Dropdown = ({
  value,
  onValueChange,
  trigger,
  selectItems,
  placeholder,
  select = false,
  dropDown = false,
  contentAlign,
  dropDownClassName,
  size,
}: {
  value?: string;
  onValueChange: (value: string) => void;
  trigger?: ReactNode;
  selectItems: { value: string; icon?: React.ReactNode; text: string }[];
  placeholder?: string;
  select?: boolean;
  dropDown?: boolean;
  contentAlign: "center" | "end" | "start";
  dropDownClassName?: string;
  size: "lg" | "md";
}) => {
  const [open, setOpen] = useState(false);

  const selectedText =
    selectItems.find((item) => item.value === value)?.text ?? placeholder;

  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger asChild>
        {trigger ?? (
          <button className={dropdownVariants({ size })}>
            <span className={dropdownTextVariants({ size })}>
              {selectedText}
            </span>
            <ArrowDown
              className={cn(
                dropdownIconVariants({ size }),
                open && "rotate-180"
              )}
            />
          </button>
        )}
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          side="bottom"
          align={contentAlign}
          position="popper"
          sideOffset={4}
          className={dropdownContentVariants({ size })}
        >
          {selectItems.map((item) => (
            <Select.Item
              key={item.value}
              value={item.value}
              className={cn(
                dropdownItemVariants({ size }),
                dropDown && dropDownClassName,
                select && "text-gray-neutral-500 hover:text-gray-neutral-700"
              )}
            >
              {item.icon}
              <Select.ItemText>{item.text}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default Dropdown;
