"use client";

import { useGetGatheringListInfo } from "@/apis/gathering-list/query/use-get-gathering-list";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { GatheringList } from "@/components/section";
import {
  Banner,
  CategoryButton,
  CreateGatheringModal,
  SearchBar,
} from "@/components/ui";
import { CATEGORIES_EXTENDS_ALL } from "@/constants/constants";
import { CategoryExtendsAllType } from "@/types/constants";
import type { SortType } from "@/types/gathering-list";
import type { SearchForm } from "@/types/search";
import { getCategoryInfo } from "@/utils/category";
import { cn } from "@/utils/cn";
import {
  convertCategoryConstantToDomain,
  convertSortConstantToDomain,
} from "@/utils/url-mapper";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
const MainPage = () => {
  const router = useRouter();

  const methods = useForm<SearchForm>({
    defaultValues: { keyword: "" },
  });

  // 사용자의 카테고리 선호 API
  const { data: userInfo } = useGetUserInfo();
  // 사용자 카테고리
  const [category1, category2] = userInfo?.categories || [];

  const [category1HeaderIcon, category1Name] = getCategoryInfo(category1);
  const [category2HeaderIcon, category2Name] = getCategoryInfo(category2);

  // 전체 모임 Top 10 조회 리스트
  const { data: popularTop10List = { content: [] } } = useGetGatheringListInfo({
    sort: "MEMBER_DESC",
    page: 0,
    size: 10,
  });

  const moreLinkForm = (
    category: CategoryExtendsAllType,
    sort: SortType = "LATEST"
  ) => {
    const categoryDomain = convertCategoryConstantToDomain(category);
    const sortDomain = convertSortConstantToDomain(sort);
    return {
      pathname: "/gathering/list",
      query: { category: categoryDomain, sort: sortDomain },
    };
  };

  const { data: category1Top10List = { content: [] } } =
    useGetGatheringListInfo({
      category: category1,
      sort: "MEMBER_DESC",
      page: 0,
      size: 10,
    });

  const { data: category2Top10List = { content: [] } } =
    useGetGatheringListInfo({
      category: category2,
      sort: "MEMBER_DESC",
      page: 0,
      size: 10,
    });

  const { data: allLatestList = { content: [] } } = useGetGatheringListInfo({
    sort: "LATEST",
    page: 0,
    size: 10,
  });

  const handleSearchSubmit = ({ keyword }: SearchForm) => {
    router.push(`/gathering/list?search=${keyword}&category=all&sort=LATEST`);
  };

  return (
    // 전체 래퍼 div
    <div className="w-full min-w-[335px]">
      {/* 배너, 검색바, 카테고리 버튼 */}
      <section className="pc:max-w-[1160px] pc:mt-[70px] tb:mt-10 mo:mt-5 flex flex-col items-center justify-center">
        <Banner className="pc:mb-17 pc:order-1 tb:mb-10 mo:mb-[26px] order-2" />
        {/* 검색바, 카테고리 버튼 */}
        <form
          className="pc:mb-10 pc:w-[880px] tb:mb-10 mo:mb-6 pc:order-1 order-1 w-full"
          onSubmit={methods.handleSubmit(handleSearchSubmit)}
        >
          <FormProvider {...methods}>
            <SearchBar size="lg" keyword="keyword" />
          </FormProvider>
        </form>
        <div
          aria-label="카테고리 탐색"
          className={cn(
            "tb:gap-[14px] pc:w-[880px] pc:mb-17 tb:mb-[90px] mo:mb-12 pc:order-1 tb:justify-between tb:flex-nowrap tb:flex order-3 w-full",
            "mo:grid mo:grid-cols-[repeat(auto-fit,minmax(74.8px,1fr))] mo:gap-3 mo:place-content-start mo:justify-items-stretch"
          )}
        >
          {CATEGORIES_EXTENDS_ALL.map((category) => (
            <CategoryButton
              key={category.value}
              category={category.value as CategoryExtendsAllType}
            />
          ))}
        </div>
      </section>
      <section className="pc:gap-[110px] tb:gap-[90px] mo:gap-12 pc:mb-[46px] tb:mb-[34px] mo:mb-[30px] mx-auto flex flex-col items-center justify-center">
        <GatheringList
          title="🔥 요즘 가장 인기 있는 모임들"
          subTitle="화제의 모임들을 확인해보세요"
          moreLink={moreLinkForm("all", "MEMBER_DESC")}
          gatheringList={popularTop10List.content}
        />
        {category1 && (
          <GatheringList
            title={`${category1HeaderIcon} 관심 있는 ${category1Name} 모임들은 어때요?`}
            subTitle={`관심 있는 ${category1Name} 모임들을 확인해보세요`}
            moreLink={moreLinkForm(category1, "LATEST")}
            gatheringList={category1Top10List.content}
          />
        )}
        {category2 && (
          <GatheringList
            title={`${category2HeaderIcon} 관심 있는 ${category2Name} 모임들은 어때요?`}
            subTitle={`관심 있는 ${category2Name} 모임들을 확인해보세요`}
            moreLink={moreLinkForm(category2, "LATEST")}
            gatheringList={category2Top10List.content}
          />
        )}

        <GatheringList
          title="👥 아직 마음에 드는 모임이 없으신가요?"
          subTitle="모든 모임들을 둘러보세요"
          moreLink={moreLinkForm("all", "LATEST")}
          gatheringList={allLatestList.content}
        />
      </section>
      {/* 모임 만들기 모달 버튼 */}
      <aside className="fixed right-5 bottom-5">
        <CreateGatheringModal />
      </aside>
    </div>
  );
};

export default MainPage;
