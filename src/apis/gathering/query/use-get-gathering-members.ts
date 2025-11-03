import queryKeys from "@/apis/query-keys";
import { GetGatheringMembersRequest } from "@/types/gathering";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGatheringMembers } from "../gathering.api";

const useGetGatheringMembers = (meetingId: GetGatheringMembersRequest) => {
  return useSuspenseQuery({
    queryKey: queryKeys.gathering.members(meetingId),
    queryFn: () => getGatheringMembers(meetingId),
    retry: false,
  });
};

export default useGetGatheringMembers;
