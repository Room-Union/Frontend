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
import { getCategoryInfo } from "@/utils/category";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const MainPage = () => {
  const router = useRouter();
  // 사용자의 카테고리 선호 API
  const { data: userInfo } = useGetUserInfo();
  // 사용자 카테고리
  const [category1, category2] = userInfo?.categories || [];

  const [category1HeaderIcon, category1Name] = getCategoryInfo(category1);
  const [category2HeaderIcon, category2Name] = getCategoryInfo(category2);
  const [searchValue, setSearchValue] = useState("");

  // 전체 모임 Top 10 조회 리스트
  const { data: popularTop10List = { content: [] } } = useGetGatheringListInfo({
    sort: "MEMBER_DESC",
    page: 0,
    size: 10,
  });

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

  const handleSearchSubmit = (value: string) => {
    router.push(`/gathering/list?search=${value}&category=all&sort=LATEST`);
  };

  useEffect(() => {
    setSearchValue(searchValue);
  }, [searchValue]);

  return (
    // 전체 래퍼 div
    <div className="w-full min-w-[335px]">
      {/* 배너, 검색바, 카테고리 버튼 */}
      <section className="pc:max-w-[1160px] pc:mt-[70px] tb:mt-10 mo:mt-5 flex flex-col items-center justify-center">
        <Banner className="pc:mb-17 pc:order-1 tb:mb-10 mo:mb-[26px] order-2" />
        {/* 검색바, 카테고리 버튼 */}
        <SearchBar
          size="lg"
          className="pc:mb-10 pc:w-[880px] tb:mb-10 mo:mb-6 pc:order-1 order-1 w-full"
          value={searchValue}
          setValue={setSearchValue}
          onSubmit={handleSearchSubmit}
        />
        <div
          aria-label="카테고리 탐색"
          className="tb:gap-[14px] pc:w-[880px] pc:mb-17 tb:mb-[90px] mo:mb-12 pc:order-1 tb:flex mo:grid mo:grid-cols-4 mo:gap-3 mo:justify-items-center order-3 w-full justify-between"
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
          moreLink={`?category=all&sort=MEMBER_DESC`}
          gatheringList={popularTop10List.content}
        />
        {category1 && (
          <GatheringList
            title={`${category1HeaderIcon} 관심 있는 ${category1Name} 모임들은 어때요?`}
            subTitle={`관심 있는 ${category1Name} 모임들을 확인해보세요`}
            moreLink={`?category=${category1}&sort=LATEST`}
            gatheringList={category1Top10List.content}
          />
        )}
        {category2 && (
          <GatheringList
            title={`${category2HeaderIcon} 관심 있는 ${category2Name} 모임들은 어때요?`}
            subTitle={`관심 있는 ${category2Name} 모임들을 확인해보세요`}
            moreLink={`?category=${category2}&sort=LATEST`}
            gatheringList={category2Top10List.content}
          />
        )}

        <GatheringList
          title="👥 아직 마음에 드는 모임이 없으신가요?"
          subTitle="모든 모임들을 둘러보세요"
          moreLink={`?category=all&sort=LATEST`}
          gatheringList={allLatestList.content}
        />
      </section>
      {/* 모임 만들기 모달 버튼 */}
      <aside className="pc:mb-15 tb:mb-[50px] mo:mb-10 sticky right-5 bottom-5 ml-auto w-fit">
        <CreateGatheringModal />
      </aside>
    </div>
  );
};

export default MainPage;
