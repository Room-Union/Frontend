"use client";

import { useGetGatheringMineList } from "@/apis/gathering-list/query/use-get-gathering-mine-list";
import GatheringList from "../gathering/list/gathering-list";

const HostGatherings = () => {
  const { data: hostGathering } = useGetGatheringMineList({
    role: "HOST",
    size: 10,
    page: 0,
  });

  return (
    <GatheringList
      title={"내가 생성한 모임"}
      moreLink={{ pathname: "/my-page/list", query: { role: "host" } }}
      gatheringList={hostGathering.content}
    />
  );
};

const MemberGatherings = () => {
  const { data: memberGathering } = useGetGatheringMineList({
    role: "MEMBER",
    size: 10,
    page: 0,
  });

  return (
    <GatheringList
      title={"내가 가입한 모임"}
      moreLink={{ pathname: "/my-page/list", query: { role: "member" } }}
      gatheringList={memberGathering.content}
    />
  );
};

const Gatherings = () => {
  return (
    <div className="tb:gap-[74px] mo:gap-15 flex flex-col">
      <HostGatherings />
      <MemberGatherings />
    </div>
  );
};

export default Gatherings;
export { HostGatherings, MemberGatherings };
