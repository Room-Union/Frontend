"use client";

import { useGetGatheringListInfo } from "@/apis/gathering-list/query/use-get-gathering-list";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { GatheringList } from "@/components/section";
import {
  Banner,
  CategoryButton,
  CreateGatheringModal,
  SearchBar,
  Spinner,
} from "@/components/ui";
import { CATEGORIES_EXTENDS_ALL } from "@/constants/constants";
import { CategoryExtendsAllType, CategoryType } from "@/types/constants";
import type { SearchForm } from "@/types/search";
import { getCategoryInfoData } from "@/utils/category";
import { cn } from "@/utils/cn";
import {
  convertCategoryConstantToDomain,
  convertSortConstantToDomain,
} from "@/utils/url-mapper";
import { useRouter } from "next/navigation";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FormProvider, useForm } from "react-hook-form";

// 각 섹션을 별도 컴포넌트로 분리하여 Suspense로 감싸기
const PopularGatheringSection = () => {
  const params = useMemo(
    () => ({
      sort: "MEMBER_DESC" as const,
      page: 0,
      size: 10,
    }),
    []
  );
  const { data } = useGetGatheringListInfo(params);

  const moreLink = useMemo(() => {
    const categoryDomain = convertCategoryConstantToDomain("all");
    const sortDomain = convertSortConstantToDomain("MEMBER_DESC");
    return {
      pathname: "/gathering/list",
      query: { category: categoryDomain, sort: sortDomain },
    };
  }, []);

  return (
    <GatheringList
      title="🔥 요즘 가장 인기 있는 모임들"
      subTitle="화제의 모임들을 확인해보세요"
      moreLink={moreLink}
      gatheringList={data.content}
    />
  );
};

const CategoryGatheringSection = ({
  category,
  headerIcon,
  categoryName,
}: {
  category: CategoryType;
  headerIcon: string;
  categoryName: string;
}) => {
  const params = useMemo(
    () => ({
      category,
      sort: "MEMBER_DESC" as const,
      page: 0,
      size: 10,
    }),
    [category]
  );
  const { data } = useGetGatheringListInfo(params);

  const moreLink = useMemo(() => {
    const categoryDomain = convertCategoryConstantToDomain(category);
    const sortDomain = convertSortConstantToDomain("LATEST");
    return {
      pathname: "/gathering/list",
      query: { category: categoryDomain, sort: sortDomain },
    };
  }, [category]);

  return (
    <GatheringList
      title={`${headerIcon} 관심 있는 ${categoryName} 모임들은 어때요?`}
      subTitle={`관심 있는 ${categoryName} 모임들을 확인해보세요`}
      moreLink={moreLink}
      gatheringList={data.content}
    />
  );
};

const AllLatestGatheringSection = () => {
  const params = useMemo(
    () => ({
      sort: "LATEST" as const,
      page: 0,
      size: 10,
    }),
    []
  );
  const { data } = useGetGatheringListInfo(params);

  const moreLink = useMemo(() => {
    const categoryDomain = convertCategoryConstantToDomain("all");
    const sortDomain = convertSortConstantToDomain("LATEST");
    return {
      pathname: "/gathering/list",
      query: { category: categoryDomain, sort: sortDomain },
    };
  }, []);

  return (
    <GatheringList
      title="👥 아직 마음에 드는 모임이 없으신가요?"
      subTitle="모든 모임들을 둘러보세요"
      moreLink={moreLink}
      gatheringList={data.content}
    />
  );
};

const MainPage = () => {
  const router = useRouter();

  const methods = useForm<SearchForm>({
    defaultValues: { keyword: "" },
  });

  // 사용자의 카테고리 선호 API
  const { data } = useGetUserInfo();
  // 사용자 카테고리
  const [category1, category2] = data?.categories || [];

  const category1Info = getCategoryInfoData(category1);
  const category2Info = getCategoryInfoData(category2);

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
        <ErrorBoundary fallback={<div>Error</div>}>
          <Suspense fallback={<Spinner variant="ghost" size="lg" />}>
            <PopularGatheringSection />
          </Suspense>
        </ErrorBoundary>
        {category1Info && (
          <ErrorBoundary fallback={<div>Error</div>}>
            <Suspense fallback={<Spinner variant="ghost" size="lg" />}>
              <CategoryGatheringSection
                category={category1Info.category}
                headerIcon={category1Info.headerIcon}
                categoryName={category1Info.name}
              />
            </Suspense>
          </ErrorBoundary>
        )}
        {category2Info && (
          <ErrorBoundary fallback={<div>Error</div>}>
            <Suspense fallback={<Spinner variant="ghost" size="lg" />}>
              <CategoryGatheringSection
                category={category2Info.category}
                headerIcon={category2Info.headerIcon}
                categoryName={category2Info.name}
              />
            </Suspense>
          </ErrorBoundary>
        )}
        <ErrorBoundary fallback={<div>Error</div>}>
          <Suspense fallback={<Spinner variant="ghost" size="lg" />}>
            <AllLatestGatheringSection />
          </Suspense>
        </ErrorBoundary>
      </section>
      {/* 모임 만들기 모달 버튼 */}
      <aside className="fixed right-5 bottom-5 z-3">
        <CreateGatheringModal />
      </aside>
    </div>
  );
};

export default MainPage;
