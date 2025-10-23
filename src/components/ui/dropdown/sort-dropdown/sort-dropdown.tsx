import Dropdown from "../dropdown";

interface SortDropdownProps {
  selectedSort: string;
  handleSortChange: (value: string) => void;
}

const SortDropdown = ({
  selectedSort,
  handleSortChange,
}: SortDropdownProps) => {
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
  return (
    <Dropdown
      value={selectedSort}
      onValueChange={handleSortChange}
      selectItems={SORT_DROPDOWN_ITEMS}
      placeholder="최신순"
      select={true}
      contentAlign="end"
      size="md"
    />
  );
};

export default SortDropdown;
