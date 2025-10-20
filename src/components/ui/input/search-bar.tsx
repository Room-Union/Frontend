"use client";

import { Search, XCircle } from "@/assets/icons";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const searchBarVariants = cva(
  "relative flex items-center bg-gray-neutral-100 rounded-full shrink-0 text-gray-neutral-400 focus-within:[&>#search-icon]:fill-[url(#search-icon-gradient)] focus-within:ring-2 focus-within:ring-blue-300 focus-within:[&>#x-button]:flex",
  {
    variants: {
      size: {
        sm: "w-[381px] h-[42px] [&>#search-icon]:h-[15.205px] [&>#search-icon]:w-[15.205px] typo-ui-sm-medium px-4 py-[10px] gap-2 [&>#x-button]:w-5 [&>#x-button]:h-5",
        lg: "tb:w-220 tb:h-14 tb:[&>#search-icon]:h-6 tb:[&>#search-icon]:w-6 tb:typo-ui-lg-medium tb:px-6 tb:py-4 tb:gap-[14px] tb:[&>#x-button]:w-6 tb:[&>#x-button]:h-6 [&>#search-icon]:h-[15.205px] mo:w-[381px] mo:h-[42px] mo:[&>#search-icon]:h-[15.205px] mo:[&>#search-icon]:w-[15.205px] mo:typo-ui-sm-medium mo:px-4 mo:py-[10px] mo:gap-2 mo:[&>#x-button]:w-5 mo:[&>#x-button]:h-5",
      },
      state: {
        default: "",
        disabled:
          "text-gray-neutral-300 pointer-events-none cursor-not-allowed [&>#search-icon]:fill-gray-neutral-300",
      },
    },
    defaultVariants: {
      size: "sm",
      state: "default",
    },
  }
);

interface SearchBarVariant extends VariantProps<typeof searchBarVariants> {
  className?: string;
  state?: "default" | "disabled";
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({
  size,
  className,
  state,
  value,
  setValue,
}: SearchBarVariant) => {
  return (
    <>
      <div className={cn(searchBarVariants({ size, state }), className)}>
        <Search
          id="search-icon"
          className={cn(
            "fill-gray-neutral-400 shrink-0 text-transparent",
            value ? "fill-[url(#search-icon-gradient)]" : ""
          )}
        />
        <input
          className={cn("w-full outline-none", value ? "text-neutral-900" : "")}
          type="text"
          placeholder="관심 있는 모임을 검색해보세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={state === "disabled"}
        />
        <button
          id="x-button"
          className={cn("ml-auto cursor-pointer", value ? "flex" : "hidden")}
          type="button"
          onClick={() => setValue("")}
        >
          <XCircle className="text-gray-neutral-400 stroke-none" />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
