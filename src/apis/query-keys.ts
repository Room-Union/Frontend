import type { CategoryType } from "@/types/constants";
import type {
  GetGatheringListRequest,
  GetGatheringSearchListRequest,
} from "@/types/gathering-list";

const queryKeys = {
  gatheringList: {
    all: ["gatheringList"] as const,
    top10: (category?: CategoryType | undefined) => [
      ...queryKeys.gatheringList.all,
      "top10",
      category,
    ],
    list: (params: GetGatheringListRequest) => [
      ...queryKeys.gatheringList.all,
      "list",
      params,
    ],
    infinite: (params: GetGatheringListRequest) => [
      ...queryKeys.gatheringList.all,
      "infinite",
      params,
    ],
    search: (params: GetGatheringSearchListRequest) => [
      ...queryKeys.gatheringList.all,
      "search",
      params,
    ],
    mine: (role: "HOST" | "MEMBER") => [
      ...queryKeys.gatheringList.all,
      "mine",
      role,
    ],
  },
  gathering: {
    all: ["gathering"] as const,
    detail: (id: string) => [...queryKeys.gathering.all, "detail", id],
  },
  user: {
    all: ["user"] as const,
  },
  appointments: {
    all: ["appointments"] as const,
    list: (meetingId: number) => [
      ...queryKeys.appointments.all,
      "list",
      meetingId,
    ],
  },
};

export default queryKeys;
