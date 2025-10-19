// 레이아웃 + API 섹션 콤포넌트
"use client";

import { SortType } from "@/types/gathering-list";
import GatheringListLayout from "@/components/section/gathering/list/gathering-list-layout";
import { useGetGatheringTop10 } from "@/apis/gathering-list/query/use-get-gathering-list";
import { useGetGatheringListInfo } from "@/apis/gathering-list/query/use-get-gathering-list";
import { CategoryType } from "@/types/constants";
import { Empty } from "@/assets/icons-colored";

// 사람 많은 순 10개 조회 섹션
const GatheringListTop10 = ({
  title,
  subTitle,
  category,
}: {
  title: string;
  subTitle: string;
  category?: CategoryType | undefined;
}) => {
  const {
    data: gatheringList,
    isLoading,
    error,
  } = useGetGatheringTop10({
    category,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!gatheringList || gatheringList.length === 0)
    return (
      <div className="flex h-[294px] w-full flex-col items-center justify-center">
        <Empty className="h-[142px] w-[217px]" />
        <p className="typo-ui-lg-medium text-gray-neutral-400">
          아직 만들어진 모임이 없어요.
        </p>
      </div>
    );
  return (
    <GatheringListLayout
      title={title}
      subTitle={subTitle}
      gatheringList={gatheringList}
    />
  );
};

// 모임 리스트 조회 섹션
const GatheringListInfo = ({
  title,
  subTitle,
  category,
  sort,
  page,
  size,
}: {
  title: string;
  subTitle: string;
  category?: CategoryType | undefined;
  sort: SortType;
  page: number;
  size: number;
}) => {
  const {
    data: gatheringList,
    isLoading,
    error,
  } = useGetGatheringListInfo({
    category,
    sort,
    page,
    size,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!gatheringList || gatheringList.length === 0)
    return (
      <div className="flex h-[294px] w-full flex-col items-center justify-center">
        <Empty className="h-[142px] w-[217px]" />
        <p className="typo-ui-lg-medium text-gray-neutral-400">
          아직 만들어진 모임이 없어요.
        </p>
      </div>
    );
  return (
    <GatheringListLayout
      title={title}
      subTitle={subTitle}
      gatheringList={gatheringList}
    />
  );
};

export { GatheringListTop10, GatheringListInfo };
