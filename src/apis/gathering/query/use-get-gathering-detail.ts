import { getGatheringDetail } from "@/apis/gathering/gathering.api";
import queryKeys from "@/apis/query-keys";
import { GetGatheringDetailRequest } from "@/types/gathering";
import { useQuery } from "@tanstack/react-query";

const useGetGatheringDetail = (meetingId: GetGatheringDetailRequest) => {
  return useQuery({
    queryKey: queryKeys.gathering.detail(meetingId),
    queryFn: () => getGatheringDetail(meetingId),
    enabled: !!meetingId,
  });
};

export default useGetGatheringDetail;
