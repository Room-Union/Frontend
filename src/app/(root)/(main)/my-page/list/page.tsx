"use client";
import { useGetGatheringMineListInfinite } from "@/apis/gathering-list/query/use-get-gathering-mine-list";
import { AuthGuard, GatheringGrid } from "@/components/section";
import { Spinner } from "@/components/ui";
import { RoleType } from "@/types/constants";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
const MyListPage = () => {
  const searchParams = useSearchParams();

  const role = searchParams.get("role")?.toUpperCase() as RoleType;

  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: "0px",
  });

  const {
    data,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetGatheringMineListInfinite({
    role,
    size: 8,
  });

  const title = {
    HOST: "내가 생성한 모임",
    MEMBER: "내가 가입한 모임",
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <AuthGuard>
      <div className="pc:py-17.5 tb:py-11.5 mo:py-6 pc:gap-11.5 tb:gap-8.5 mo:gap-7.5 flex w-full flex-col">
        <h2 className="pc:typo-ui-2xl-semibold tb:typo-ui-xl-semibold mo:typo-ui-lg-semibold text-gray-neutral-900">
          {title[role]}
        </h2>
        <GatheringGrid gatheringList={data} />
        <div ref={ref} className="pc:h-[46px] tb:h-[34px] mo:h-[30px]">
          {hasNextPage && <Spinner variant="ghost" size="lg" />}
        </div>
      </div>
    </AuthGuard>
  );
};

export default MyListPage;
