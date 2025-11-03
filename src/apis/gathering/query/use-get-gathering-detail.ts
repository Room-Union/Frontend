import { getGatheringDetail } from "@/apis/gathering/gathering.api";
import queryKeys from "@/apis/query-keys";
import { GetGatheringDetailRequest } from "@/types/gathering";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetGatheringDetail = (meetingId: GetGatheringDetailRequest) => {
  return useSuspenseQuery({
    queryKey: queryKeys.gathering.detail(meetingId),
    queryFn: () => getGatheringDetail(meetingId),
    retry: false,
  });
};

export default useGetGatheringDetail;
