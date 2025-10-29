"use client";

import { useGetGatheringList } from "@/apis/gathering-list/query/use-get-gathering-list";
import { GatheringGrid } from "@/components/section";
import { Spinner } from "@/components/ui";
import SearchBar from "@/components/ui/input/search-bar";
import CreateGatheringModal from "@/components/ui/modal/gathering/form/create-gathering-modal";
import CategorySelect from "@/components/ui/select/category-select/category-select";
import SortSelect from "@/components/ui/select/sort-dropdown/sort-select";
import { useInView } from "@/hooks";
import type { CategoryDomainType, CategoryType } from "@/types/constants";
import type { SortDomainType } from "@/types/gathering-list";
import {
  convertCategoryDomainToConstant,
  convertSortDomainToConstant,
} from "@/utils/url-mapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GatheringListPage = () => {
  const router = useRouter();
  // 카테고리 조회
  const searchParams = useSearchParams();
  const categoryDomain = searchParams.get("category") as CategoryDomainType;
  const sortDomain = searchParams.get("sort") as SortDomainType;

  // Domain을 Constant로 변환
  const category =
    categoryDomain === "all"
      ? undefined
      : (convertCategoryDomainToConstant(categoryDomain) as CategoryType);
  const sort = convertSortDomainToConstant(sortDomain);

  const [searchValue, setSearchValue] = useState("");

  const handleCategoryChange = (value: string) => {
    router.push(`/gathering/list?category=${value}&sort=${sortDomain}`);
  };

  const handleSortChange = (value: string) => {
    router.push(`/gathering/list?category=${categoryDomain}&sort=${value}`);
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetGatheringList({
    category,
    sort,
    size: 8,
  });

  const { targetRef, isInView } = useInView();

  useEffect(() => {
    if (isInView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isLoading, fetchNextPage]);

  return (
    <>
      <section className="pc:mb-[46px] tb:mb-[34px] mo:mb-[30px]">
        <div className="mb-5">
          <CategorySelect
            selectedCategory={categoryDomain}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="flex items-center">
          <div className="flex-1">
            <SearchBar value={searchValue} setValue={setSearchValue} />
          </div>
          <div>
            <SortSelect
              selectedSortValue={sortDomain}
              handleSortChange={handleSortChange}
            />
          </div>
        </div>
      </section>
      <GatheringGrid
        gatheringList={data?.pages.flatMap((page) => page.content) || []}
      />
      <div ref={targetRef} className="pc:h-[46px] tb:h-[34px] mo:h-[30px]">
        {hasNextPage && <Spinner variant="ghost" size="lg" />}
      </div>

      {/* 모임 만들기 모달 버튼 */}
      <aside className="pc:mb-15 tb:mb-[50px] mo:mb-10 sticky right-5 bottom-5 ml-auto w-fit">
        <CreateGatheringModal />
      </aside>
    </>
  );
};

export default GatheringListPage;
