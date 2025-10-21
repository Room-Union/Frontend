"use client";

import { Banner, CategoryButton, SearchBar } from "@/components/ui";
import { GatheringList, GatheringGrid } from "@/components/section";
import useGetGatheringListInfo from "@/apis/gathering-list/query/use-get-gathering-list";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";

const MainPage = () => {
  // 사용자의 카테고리 선호 API
  const { data: userInfo, isLoading: isUserLoading } = useGetUserInfo();
  // 사용자 카테고리 추출
  const [category1, category2] = userInfo?.categories || [];

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
    <div className="pc:w-[1200px] pc:pr-[20px] pc:pl-[20px] w-full min-w-[375px]">
      {/* 배너, 검색바, 카테고리 버튼 */}
      <section className="pc:max-w-[1100px] mt-[70px] flex flex-col items-center justify-center">
        <Banner className="pc:mb-17" />
        {/* 검색바, 카테고리 버튼 */}
        <section className="pc:mb-17 pc:max-w-[880px] mx-auto flex flex-col items-center justify-center">
          <SearchBar
            size="lg"
            className="pc:mb-10 w-full"
            value={""}
            setValue={() => {}}
          />
          <div
            aria-label="카테고리 탐색"
            className="tb:gap-4 pc:gap-5 mx-auto flex flex-wrap justify-between"
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
      </section>
      <section className="pc:max-w-[1160px] mx-auto flex flex-col items-center justify-center gap-[110px]">
        <GatheringList
          title="🔥 요즘 가장 인기 있는 모임들"
          subTitle="화제의 모임들을 확인해보세요"
          moreLink="all"
          gatheringList={popularTop10List.content}
        />
        {category1 && (
          <GatheringList
            title={`🎮 관심 있는 ${category1}들은 어때요?`}
            subTitle={`관심 있는 ${category1} 모임들을 확인해보세요`}
            moreLink={category1}
            gatheringList={category1Top10List.content}
          />
        )}
        {category2 && (
          <GatheringList
            title={`📚 관심 있는 ${category2}들은 어때요?`}
            subTitle={`관심 있는 ${category2} 모임들을 확인해보세요`}
            moreLink={category2}
            gatheringList={category2Top10List.content}
          />
        )}
        <GatheringGrid
          title="👥 아직 마음에 드는 모임이 없으신가요?"
          subTitle="모든 모임들을 둘러보세요"
          moreLink="all"
          gatheringList={allLatestList.content}
        />
      </section>
    </div>
  );
};

export default MainPage;
