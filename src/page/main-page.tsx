"use client";

import { Banner, CategoryButton, SearchBar } from "@/components/ui";
import { GatheringList, GatheringGrid } from "@/components/section";
import useGetGatheringListInfo from "@/apis/gathering-list/query/use-get-gathering-list";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { cn } from "@/utils/cn";
import { getCategoryName } from "@/utils/category";

const MainPage = () => {
  // 사용자의 카테고리 선호 API
  const { data: userInfo } = useGetUserInfo();
  // 사용자 카테고리
  const [category1, category2] = userInfo?.categories || [];

  const categoryName1 = getCategoryName(category1);
  const categoryName2 = getCategoryName(category2);

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
    size: 8,
  });

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
          value={""}
          setValue={() => {}}
        />
        <div
          aria-label="카테고리 탐색"
          className="tb:gap-[14px] pc:w-[880px] pc:mb-17 tb:mb-[90px] mo:mb-12 pc:order-1 tb:flex mo:grid mo:grid-cols-4 mo:gap-3 mo:justify-items-center order-3 w-full justify-between"
        >
          <CategoryButton category="all" />
          <CategoryButton category="CULTURE_ART" />
          <CategoryButton category="GAME" />
          <CategoryButton category="SELF_DEVELOPMENT" />
          <CategoryButton category="COMMUNICATION" />
          <CategoryButton category="HOBBY" />
          <CategoryButton category="INFO_ECONOMY" />
        </div>
      </section>
      <section className="pc:gap-[110px] tb:gap-[90px] mo:gap-12 mx-auto flex flex-col items-center justify-center">
        <GatheringList
          title="🔥 요즘 가장 인기 있는 모임들"
          subTitle="화제의 모임들을 확인해보세요"
          moreLink="all"
          gatheringList={popularTop10List.content}
        />
        {category1 && (
          <GatheringList
            title={`🎮 관심 있는 ${categoryName1}들은 어때요?`}
            subTitle={`관심 있는 ${categoryName1} 모임들을 확인해보세요`}
            moreLink={category1}
            gatheringList={category1Top10List.content}
          />
        )}
        {category2 && (
          <GatheringList
            title={`📚 관심 있는 ${categoryName2}들은 어때요?`}
            subTitle={`관심 있는 ${categoryName2} 모임들을 확인해보세요`}
            moreLink={category2}
            gatheringList={category2Top10List.content}
          />
        )}
        <GatheringGrid
          title="👥 아직 마음에 드는 모임이 없으신가요?"
          subTitle="모든 모임들을 둘러보세요"
          moreLink="all"
          containerClassName="scrollbar-hide overflow-x-auto scroll-smooth pc:mx-0 tb:-mx-6 mo:-mx-5 mx-auto"
          gridClassName={cn(
            "grid grid-cols-4 gap-x-5 tb:gap-y-10 mo:gap-y-[34px] mo:min-w-[860px] tb:min-w-[1160px]"
          )}
          gatheringList={allLatestList.content}
        />
      </section>
    </div>
  );
};

export default MainPage;
