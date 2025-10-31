"use client";
import {
  Art,
  Chart,
  Chat,
  Game,
  Sport,
  Study,
  UsersThree,
} from "@/assets/icons";
import { Select } from "radix-ui";
import { useState } from "react";
import SelectButton from "../select-button";
import CategoryButton from "./category-button";

interface CategoryDropdownProps {
  selectedCategory: string;
  handleCategoryChange: (value: string) => void;
}

const CATEGORY_DROPDOWN_ITEMS = [
  {
    value: "all",
    icon: <UsersThree className="group-hover:text-gray-neutral-800 size-6" />,
    text: "전체",
  },
  {
    value: "culture-art",
    icon: <Art className="size-6 group-hover:text-yellow-400" />,
    text: "문화 · 예술",
  },
  {
    value: "game",
    icon: <Game className="size-6 group-hover:text-red-500" />,
    text: "게임",
  },
  {
    value: "self-development",
    icon: <Study className="size-6 group-hover:text-green-500" />,
    text: "자기계발",
  },
  {
    value: "communication",
    icon: <Chat className="size-6 group-hover:text-blue-500" />,
    text: "소통",
  },
  {
    value: "hobby",
    icon: <Sport className="size-6 group-hover:text-orange-500" />,
    text: "취미",
  },
  {
    value: "info-economy",
    icon: <Chart className="size-6 group-hover:text-purple-500" />,
    text: "정보·경제",
  },
];

const CategorySelect = ({
  selectedCategory,
  handleCategoryChange,
}: CategoryDropdownProps) => {
  const [open, setOpen] = useState(false);
  const placeholder =
    CATEGORY_DROPDOWN_ITEMS.find((item) => item.value === selectedCategory)
      ?.text || "전체";
  return (
    <Select.Root
      value={selectedCategory}
      onValueChange={handleCategoryChange}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger className="outline-none">
        <SelectButton open={open} size="lg">
          {`${placeholder} 모임`}
        </SelectButton>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="tb:gap-3 mo:gap-1.5 mo:py-3 mo:pl-2 mo:pr-3 tb:py-4 tb:pl-2.5 tb:pr-3.5 border-gray-neutral-200 flex flex-col rounded-xl border bg-white shadow-[0_3px_6px_0_rgba(0,0,0,0.10)]"
          position="popper"
          alignOffset={-1}
          sideOffset={4}
        >
          <Select.Viewport>
            {CATEGORY_DROPDOWN_ITEMS.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className="outline-none"
              >
                <CategoryButton icon={item.icon}>{item.text}</CategoryButton>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default CategorySelect;
