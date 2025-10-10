import {
  CreateGatheringRequest,
  DeleteGatheringRequest,
  GetGatheringDetailResponse,
  UpdateGatheringRequest,
} from "@/types/gathering";

const mockGatheringCreate: CreateGatheringRequest = {
  name: "온라인 영화 토론 모임",
  description:
    "매주 다른 영화를 함께 보고 생각을 나누는 시간입니다. 다양한 장르의 영화를 통해 새로운 관점을 발견하고, 영화를 사랑하는 사람들과 깊이 있는 대화를 나눠보세요. 영화에 대한 사전 지식이 없어도 괜찮습니다. 함께 영화를 감상하고 자유롭게 의견을 나누는 것이 목적입니다.",
  category: "문화・예술",
  meetingImage: undefined,
  maxMemberCount: 30,
  platformUrls: ["https://discord.gg/abce"],
};

const mockGetGatheringDetail: GetGatheringDetailResponse = {
  meetingId: 1,
  name: "온라인 영화 토론 모임",
  description:
    "매주 다른 영화를 함께 보고 생각을 나누는 시간입니다. 다양한 장르의 영화를 통해 새로운 관점을 발견하고, 영화를 사랑하는 사람들과 깊이 있는 대화를 나눠보세요. 영화에 대한 사전 지식이 없어도 괜찮습니다. 함께 영화를 감상하고 자유롭게 의견을 나누는 것이 목적입니다.",
  category: "문화・예술",
  meetingImage: "",
  createdAt: "2025-09-26T10:30:00.000Z",
  currentMemberCount: 24,
  maxMemberCount: 30,
  userId: 1,
  nickname: "YOON",
  profileImage: "",
  joined: true,
  platformUrls: ["https://discord.gg/abce"],
};

const mockUpdateGathering: UpdateGatheringRequest = {
  name: "온라인 게임 모임",
  description:
    "매주 다른 게임을 함께 하는 시간입니다. 다양한 장르의 게임을 즐기는 것이 목적입니다.",
  category: "문화・예술",
  meetingImage: undefined,
  maxMemberCount: 50,
};

const mockDeleteGathering: DeleteGatheringRequest = {
  meetingId: 1,
};

export {
  mockDeleteGathering,
  mockGatheringCreate,
  mockGetGatheringDetail,
  mockUpdateGathering,
};
