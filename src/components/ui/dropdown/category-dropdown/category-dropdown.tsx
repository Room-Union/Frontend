import {
  Art,
  Chart,
  Chat,
  Game,
  Sport,
  Study,
  UsersThree,
} from "@/assets/icons";
import Dropdown from "../dropdown";

interface CategoryDropdownProps {
  selectedCategory: string;
  handleCategoryChange: (value: string) => void;
}

const CategoryDropdown = ({
  selectedCategory,
  handleCategoryChange,
}: CategoryDropdownProps) => {
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

  return (
    <Dropdown
      value={selectedCategory}
      onValueChange={handleCategoryChange}
      selectItems={CATEGORY_DROPDOWN_ITEMS}
      placeholder="전체"
      select={true}
      contentAlign="start"
      size="lg"
    />
  );
};

export default CategoryDropdown;
