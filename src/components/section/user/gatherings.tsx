"use client";

import { useGetGatheringMineList } from "@/apis/gathering-list/query/use-get-gathering-mine-list";
import GatheringList from "../gathering/list/gathering-list";

const Gatherings = () => {
  const {
    data: hostGathering,
    isPending: isHostLoading,
    isError: isHostError,
  } = useGetGatheringMineList({
    role: "HOST",
    size: 10,
    page: 0,
  });

  const {
    data: memberGathering,
    isPending: isMemberLoading,
    isError: isMemberError,
  } = useGetGatheringMineList({
    role: "MEMBER",
    size: 10,
    page: 0,
  });

  if (isHostLoading || isMemberLoading) return <div>Loading...</div>;

  if (isHostError || isMemberError) return <div>Error</div>;

  return (
    <div className="tb:gap-[74px] mo:gap-15 flex flex-col">
      <GatheringList
        title={"내가 생성한 모임"}
        moreLink={{ pathname: "/my-page/list", query: { role: "host" } }}
        gatheringList={hostGathering.content}
      />
      <GatheringList
        title={"내가 가입한 모임"}
        moreLink={{ pathname: "/my-page/list", query: { role: "member" } }}
        gatheringList={memberGathering.content}
      />
    </div>
  );
};

export default Gatherings;
