"use client";

import {
  useGetGatheringList,
  useGetGatheringSearchList,
} from "@/apis/gathering-list/query/use-get-gathering-list";
import { GatheringGrid } from "@/components/section";
import { CreateGatheringModal, Spinner } from "@/components/ui";
import SearchBar from "@/components/ui/input/search-bar";
import CategorySelect from "@/components/ui/select/category-select/category-select";
import SortSelect from "@/components/ui/select/sort-dropdown/sort-select";
import { useInView } from "@/hooks";
import type { CategoryDomainType, CategoryType } from "@/types/constants";
import type { SortDomainType, SortType } from "@/types/gathering-list";
import type { SearchForm } from "@/types/search";
import {
  convertCategoryDomainToConstant,
  convertSortDomainToConstant,
} from "@/utils/url-mapper";
import { searchKeywordSchema } from "@/validation/validation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const GatheringListPage = () => {
  const router = useRouter();
  // URL 파라미터 조회
  const searchParams = useSearchParams();
  // 검색어
  const keyword = searchParams.get("search") ?? "";
  const categoryDomain = searchParams.get("category") as CategoryDomainType;
  const sortDomain = (searchParams.get("sort") ?? "latest") as SortDomainType;

  // 검색 모드 여부
  const isSearchMode = !!keyword;

  // 서버에 전달할 필터링된 검색어
  const filterResult = searchKeywordSchema.safeParse(keyword);
  const filteredKeyword = filterResult.success ? filterResult.data : "";

  // 검색어가 30자를 초과하는지 확인
  const keywordLength = filteredKeyword.length;
  const over30Keyword = !!filteredKeyword && keywordLength > 30;

  // 검색 모드이고 검색어가 30자를 초과하면 API 호출하지 않음
  const skipSearchApi = isSearchMode && over30Keyword;

  // 카테고리 조회 결과
  const categoryConstant =
    !categoryDomain || categoryDomain === "all"
      ? undefined
      : (convertCategoryDomainToConstant(categoryDomain) as CategoryType);
  const sortConstant = convertSortDomainToConstant(sortDomain) as SortType;

  const methods = useForm<SearchForm>({
    defaultValues: { keyword: keyword ?? "" },
  });

  const searchApi = useGetGatheringSearchList(
    {
      meetingName: filteredKeyword,
      sort: sortConstant,
      category: categoryConstant,
      size: 8,
    },
    { enabled: !skipSearchApi }
  );

  const categoryApi = useGetGatheringList({
    category: categoryConstant,
    sort: sortConstant,
    size: 8,
  });

  // 검색 제출 핸들러
  const handleSearchSubmit = ({ keyword }: SearchForm) => {
    router.push(
      `/gathering/list?${keyword ? `search=${keyword}` : ""}&category=${categoryDomain}&sort=${sortDomain}`
    );
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (value: string) => {
    if (isSearchMode) {
      router.push(
        `/gathering/list?search=${keyword}&category=${value}&sort=${sortDomain}`
      );
    } else {
      router.push(`/gathering/list?category=${value}&sort=${sortDomain}`);
    }
  };

  // 정렬 변경 핸들러
  const handleSortChange = (value: string) => {
    if (isSearchMode) {
      router.push(
        `/gathering/list?search=${keyword}&category=${categoryDomain}&sort=${value}`
      );
    } else {
      router.push(`/gathering/list?category=${categoryDomain}&sort=${value}`);
    }
  };

  // 검색어가 30자를 초과하면 빈 데이터 반환
  const emptySearchResult = { pages: [{ content: [] }] };

  const { data, isLoading, fetchNextPage, hasNextPage } = isSearchMode
    ? skipSearchApi
      ? {
          data: emptySearchResult,
          isLoading: false,
          fetchNextPage: () => {},
          hasNextPage: false,
        }
      : searchApi
    : categoryApi;

  const { targetRef, isInView } = useInView();

  useEffect(() => {
    if (isInView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isLoading, fetchNextPage]);

  console.log(filteredKeyword);

  return (
    <>
      <section className="pc:mt-[70px] tb:mt-[46px] mo:mt-6 pc:mb-[46px] tb:mb-[34px] mo:mb-[30px]">
        <div className="tb:mb-5 mo:mb-2">
          <CategorySelect
            selectedCategory={categoryDomain}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="flex items-center">
          <form
            className="flex-1"
            onSubmit={methods.handleSubmit(handleSearchSubmit)}
          >
            <FormProvider {...methods}>
              <SearchBar keyword={"keyword"} />
            </FormProvider>
          </form>
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
        isSearchMode={isSearchMode}
      />
      <div ref={targetRef} className="pc:h-[46px] tb:h-[34px] mo:h-[30px]">
        {hasNextPage && <Spinner variant="ghost" size="lg" />}
      </div>

      {/* 모임 만들기 모달 버튼 */}
      <aside className="fixed right-5 bottom-5 z-3">
        <CreateGatheringModal />
      </aside>
    </>
  );
};

export default GatheringListPage;
