import {
  CreateGatheringRequest,
  DeleteGatheringRequest,
  GetGatheringDetailResponse,
  UpdateGatheringRequest,
} from "@/types/gathering";

const mockGatheringCreate: CreateGatheringRequest = {
  title: "온라인 영화 토론 모임",
  description:
    "매주 다른 영화를 함께 보고 생각을 나누는 시간입니다. 다양한 장르의 영화를 통해 새로운 관점을 발견하고, 영화를 사랑하는 사람들과 깊이 있는 대화를 나눠보세요. 영화에 대한 사전 지식이 없어도 괜찮습니다. 함께 영화를 감상하고 자유롭게 의견을 나누는 것이 목적입니다.",
  category: "문화・예술",
  image: undefined,
  maxMemberCount: 30,
  platformUrls: ["https://discord.gg/abce"],
};

const mockGetGatheringDetail: GetGatheringDetailResponse = {
  id: 1,
  title: "온라인 영화 토론 모임",
  description:
    "매주 다른 영화를 함께 보고 생각을 나누는 시간입니다. 다양한 장르의 영화를 통해 새로운 관점을 발견하고, 영화를 사랑하는 사람들과 깊이 있는 대화를 나눠보세요. 영화에 대한 사전 지식이 없어도 괜찮습니다. 함께 영화를 감상하고 자유롭게 의견을 나누는 것이 목적입니다.",
  category: "문화・예술",
  image: "",
  createdAt: "2025-09-26T10:30:00.000Z",
  currentMemberCount: 24,
  maxMemberCount: 30,
  host: {
    id: 1,
    nickname: "YOON",
    image: "",
  },
  isJoined: true,
  platformUrls: ["https://discord.gg/abce"],
};

const mockUpdateGathering: UpdateGatheringRequest = {
  title: "온라인 게임 모임",
  description:
    "매주 다른 게임을 함께 하는 시간입니다. 다양한 장르의 게임을 즐기는 것이 목적입니다.",
  category: "문화・예술",
  image: undefined,
  maxMemberCount: 50,
};

const mockDeleteGathering: DeleteGatheringRequest = {
  id: 1,
};

export {
  mockDeleteGathering,
  mockGatheringCreate,
  mockGetGatheringDetail,
  mockUpdateGathering,
};
