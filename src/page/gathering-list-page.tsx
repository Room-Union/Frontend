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
import Dropdown from "@/components/ui/dropdown/dropdown";
import { useState } from "react";

const CATEGORY_DROPDOWN_ITEMS = [
  {
    value: "all",
    icon: <UsersThree className="group-hover:text-gray-neutral-800 size-6" />,
    text: "전체",
  },
  {
    value: "culture-art",
    icon: <Art className="size-6 group-hover:text-yellow-400" />,
    text: "문화·예술",
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

const GatheringListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("latest");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };

  return (
    <div>
      <Dropdown
        value={selectedCategory}
        onValueChange={handleCategoryChange}
        selectItems={CATEGORY_DROPDOWN_ITEMS}
        placeholder="전체"
        select={true}
        contentAlign="start"
        size="lg"
      />
      <Dropdown
        value={selectedSort}
        onValueChange={handleSortChange}
        selectItems={SORT_DROPDOWN_ITEMS}
        placeholder="최신순"
        select={true}
        contentAlign="end"
        size="md"
      />
    </div>
  );
};

export default GatheringListPage;