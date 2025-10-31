"use client";

import { Search, XCircle } from "@/assets/icons";
import type { SearchForm } from "@/types/search";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { useFormContext } from "react-hook-form";

const searchBarVariants = cva(
  "relative flex items-center bg-gray-neutral-100 rounded-full shrink-0 text-gray-neutral-400 focus-within:ring-2 focus-within:ring-blue-300 focus-within:[&>#search-icon]:fill-[url(#search-icon-gradient)]",
  {
    variants: {
      size: {
        sm: "tb:w-[381px] mo:w-full h-[42px] [&>#search-icon]:h-[15.205px] [&>#search-icon]:w-[15.205px] typo-ui-sm-medium px-4 py-[10px] gap-2 [&>#x-button]:w-5 [&>#x-button]:h-5",
        lg: "tb:h-14 tb:[&>#search-icon]:h-6 tb:[&>#search-icon]:w-6 tb:typo-ui-lg-medium tb:px-6 tb:py-4 tb:gap-[14px] tb:[&>#x-button]:w-6 tb:[&>#x-button]:h-6 [&>#search-icon]:h-[15.205px] mo:h-[42px] mo:[&>#search-icon]:h-[15.205px] mo:[&>#search-icon]:w-[15.205px] mo:typo-ui-sm-medium mo:px-4 mo:py-[10px] mo:gap-2 mo:[&>#x-button]:w-5 mo:[&>#x-button]:h-5",
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
  keyword: keyof SearchForm;
}

const SearchBar = ({ size, className, state, keyword }: SearchBarVariant) => {
  const { setValue, register } = useFormContext<SearchForm>();

  const handleClear = () => {
    setValue(keyword, "");
  };

  return (
    <>
      <div className={cn(searchBarVariants({ size, state }), className)}>
        <input
          className="peer placeholder:text-gray-neutral-400 order-2 w-full outline-none [&:not(:placeholder-shown)]:text-neutral-900"
          type="text"
          placeholder="관심 있는 모임을 검색해보세요"
          {...register(keyword)}
          disabled={state === "disabled"}
        />
        <Search
          id="search-icon"
          className="fill-gray-neutral-400 pointer-events-none order-1 shrink-0 text-transparent peer-[:not(:placeholder-shown)]:fill-[url(#search-icon-gradient)]"
        />
        <button
          id="x-button"
          className="order-3 ml-auto hidden cursor-pointer peer-[:not(:placeholder-shown)]:flex"
          type="button"
          onClick={handleClear}
        >
          <XCircle className="text-gray-neutral-400 stroke-none" />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
