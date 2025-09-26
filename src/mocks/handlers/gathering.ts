import { mockGatheringDelete, mockGatheringDetail } from "@/data/gathering";
import { CreateGathering, UpdateGathering } from "@/types/gathering";
import { http, HttpResponse } from "msw";

const gatheringHandler = [
  // 모임 생성
  http.post(
    "http://localhost:4000/gathering/create",
    async ({ request, params }) => {
      const id = Number(params.id);
      const inputData = (await request.json()) as CreateGathering;

      // inputData를 기반으로 모임 상세 정보 생성
      const createdGathering = {
        id: id,
        title: inputData.title,
        description: inputData.description,
        category: inputData.category,
        image: "",
        createdAt: new Date().toISOString(),
        currentMemberCount: 1,
        maxMemberCount: inputData.maxMemberCount,
        host: {
          id: 1,
          nickname: "YOON",
          image: "",
        },
        condition: inputData.condition,
        isJoined: false,
      };

      return HttpResponse.json(createdGathering);
    }
  ),

  // 모임 상세 조회
  http.get("http://localhost:4000/gathering/detail/:id", ({ params }) => {
    const id = Number(params.id);

    return HttpResponse.json({ ...mockGatheringDetail, id });
  }),

  // 모임 수정
  http.patch(
    "http://localhost:4000/gathering/detail/:id",
    async ({ request, params }) => {
      const id = Number(params.id);
      const inputData = (await request.json()) as UpdateGathering;

      // inputData를 기반으로 모임 상세 정보 수정
      const updatedGathering = {
        id: id,
        title: inputData.title,
        description: inputData.description,
        category: inputData.category,
        image: "",
        maxMemberCount: inputData.maxMemberCount,
        condition: inputData.condition,
      };

      return HttpResponse.json(updatedGathering);
    }
  ),

  // 모임 삭제
  http.delete("http://localhost:4000/gathering/detail/:id", ({ params }) => {
    const id = Number(params.id);
    return HttpResponse.json({ ...mockGatheringDelete, id });
  }),
];

export default gatheringHandler;
