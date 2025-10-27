import { mockDeleteGathering, mockGetGatheringDetail } from "@/data/gathering";
import { CreateGatheringRequest, GatheringFormData } from "@/types/gathering";
import { http, HttpResponse } from "msw";

const gatheringHandler = [
  // 모임 생성
  http.post("*/api/v1/meetings", async ({ request }) => {
    const inputData = (await request.json()) as CreateGatheringRequest;

    // inputData를 기반으로 모임 상세 정보 생성
    const createdGathering = {
      meetingId: Date.now(),
      name: inputData.name,
      description: inputData.description,
      category: inputData.category,
      meetingImage: "",
      createdAt: new Date().toISOString(),
      currentMemberCount: 1,
      maxMemberCount: inputData.maxMemberCount,
      userId: 1,
      nickname: "YOON",
      profileImage: "",
      joined: false,
      platformURL: inputData.platformURL,
    };

    return HttpResponse.json(createdGathering);
  }),

  // 모임 상세 조회
  http.get("*/api/v1/meetings/:id", ({ params }) => {
    const meetingId = Number(params.id);

    return HttpResponse.json({ ...mockGetGatheringDetail, meetingId });
  }),

  // 모임 수정
  http.put("*/api/v1/meetings/:id", async ({ request, params }) => {
    const meetingId = Number(params.id);
    const requestBody = (await request.json()) as { data: GatheringFormData };

    // inputData를 기반으로 모임 상세 정보 수정
    const updatedGathering = {
      meetingId: meetingId,
      name: requestBody.data.name,
      description: requestBody.data.description,
      category: requestBody.data.category,
      meetingImage: requestBody.data.meetingImage || "",
      maxMemberCount: requestBody.data.maxMemberCount,
      platformURL: requestBody.data.platformURL,
    };

    return HttpResponse.json(updatedGathering);
  }),

  // 모임 삭제
  http.delete("*/api/v1/meetings/:id", ({ params }) => {
    const meetingId = Number(params.id);
    return HttpResponse.json({ ...mockDeleteGathering, meetingId });
  }),
];

export default gatheringHandler;
