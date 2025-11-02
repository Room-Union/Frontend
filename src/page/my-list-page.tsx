"use client";
import useGetGatheringMineList from "@/apis/gathering-list/query/use-get-gathering-mine-list";
import { AuthGuard, GatheringGrid } from "@/components/section";
import { RoleType } from "@/types/constants";
import { useSearchParams } from "next/navigation";

const MyListPage = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role")?.toUpperCase() as RoleType;
  const { data, isLoading, isError } = useGetGatheringMineList({
    role,
    page: 0,
    size: 10,
  });

  const title = {
    HOST: "내가 생성한 모임",
    MEMBER: "내가 가입한 모임",
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <AuthGuard>
      <div className="pc:py-17.5 tb:py-11.5 mo:py-6 pc:gap-11.5 tb:gap-8.5 mo:gap-7.5 flex w-full flex-col">
        <h2 className="pc:typo-ui-2xl-semibold tb:typo-ui-xl-semibold mo:typo-ui-lg-semibold text-gray-neutral-900">
          {title[role]}
        </h2>
        <GatheringGrid gatheringList={data?.content} />
      </div>
    </AuthGuard>
  );
};

export default MyListPage;
