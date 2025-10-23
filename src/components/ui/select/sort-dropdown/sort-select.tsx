"use client";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import SelectButton from "../select-button";
import SortButton from "./sort-button";

interface SortSelectProps {
  selectedSortValue: string;
  handleSortChange: (value: string) => void;
}

const SORT_DROPDOWN_ITEMS = [
  {
    value: "latest",
    text: "최신순",
  },
  {
    value: "member-desc",
    text: "인기순",
  },
];

const SortSelect = ({
  selectedSortValue,
  handleSortChange,
}: SortSelectProps) => {
  const [open, setOpen] = useState(false);

  const placeholder =
    SORT_DROPDOWN_ITEMS.find((item) => item.value === selectedSortValue)
      ?.text || "최신순";

  return (
    <Select.Root
      value={selectedSortValue}
      onValueChange={handleSortChange}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger className="outline-none">
        <SelectButton
          open={open}
          size="sm"
          buttonClassName="tb:typo-ui-md-medium tb:text-gray-neutral-600 tb:rounded-xl tb:px-3 tb:py-1 tb:gap-1"
          iconClassName="tb:size-4 tb:text-gray-neutral-600"
        >
          {placeholder}
        </SelectButton>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="border-gray-neutral-200 rounded-xl border bg-white p-2.5 shadow-[0_3px_6px_0_rgba(0,0,0,0.10)]"
          position="popper"
          alignOffset={-1}
          sideOffset={4}
        >
          <Select.Viewport>
            {SORT_DROPDOWN_ITEMS.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className="outline-none"
              >
                <SortButton
                  size="md"
                  className="tb:px-3 tb:py-3.5 tb:typo-ui-md-semibold"
                >
                  {item.text}
                </SortButton>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SortSelect;
