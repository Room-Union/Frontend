"use client";

import { useGetGatheringList } from "@/apis/gathering-list/query/use-get-gathering-list";
import { GatheringGrid } from "@/components/section";
import CreateAppointmentModal from "@/components/ui/modal/gathering/appointment/create-appointment-modal";
import type { CategoryExtendsAllType } from "@/types/constants";
import type { SortType } from "@/types/gathering-list";
import useInView from "@/utils/useInView";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GatheringListPage = () => {
  const searchParams = useSearchParams();
  const category =
    (searchParams.get("category") as CategoryExtendsAllType) || "all";
  const sort = (searchParams.get("sort") as SortType) || "LATEST";

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetGatheringList({
    category: category === "all" ? undefined : category,
    sort: sort,
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
      <GatheringGrid
        title="모임 리스트"
        subTitle="모임 리스트"
        moreLink="/gathering/list"
        gridClassName="grid pc:grid-cols-4 gap-5 tb:grid-cols-2 grid-cols-1 mo:grid-cols-3"
        gatheringList={data?.pages.flatMap((page) => page.content) || []}
      />
      <aside>
        <CreateAppointmentModal />
      </aside>
      <div ref={targetRef} className="h-10" />
    </>
  );
};

export default GatheringListPage;
