import { getGatheringDetail } from "@/apis/gathering/gathering.api";
import queryKeys from "@/apis/query-keys";
import { useQuery } from "@tanstack/react-query";

const useGetGatheringDetail = (id: string) => {
  const meetingId = Number(id);

  return useQuery({
    queryKey: queryKeys.gathering.detail(id),
    queryFn: () => getGatheringDetail(meetingId),
    enabled: !!id && !isNaN(meetingId),
  });
};

export default useGetGatheringDetail;
