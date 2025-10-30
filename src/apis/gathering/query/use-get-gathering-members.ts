import queryKeys from "@/apis/query-keys";
import { GetGatheringMembersRequest } from "@/types/gathering";
import { useQuery } from "@tanstack/react-query";
import { getGatheringMembers } from "../gathering.api";

const useGetGatheringMembers = (meetingId: GetGatheringMembersRequest) => {
  return useQuery({
    queryKey: queryKeys.gathering.members(meetingId),
    queryFn: () => getGatheringMembers(meetingId),
    enabled: !!meetingId,
  });
};

export default useGetGatheringMembers;
