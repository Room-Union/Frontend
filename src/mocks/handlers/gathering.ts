import {
  mockGatheringCreate,
  mockGatheringDelete,
  mockGatheringDetail,
  mockGatheringUpdate,
} from "@/data/gathering";
import { http, HttpResponse } from "msw";

const gatheringHandler = [
  // 모임 생성
  http.post("http://localhost:4000/gathering/create", () => {
    return HttpResponse.json(mockGatheringCreate);
  }),

  // 모임 상세 조회
  http.get("http://localhost:4000/gathering/detail/:id", () => {
    return HttpResponse.json(mockGatheringDetail);
  }),

  // 모임 수정
  http.patch("http://localhost:4000/gathering/detail/:id", () => {
    return HttpResponse.json(mockGatheringUpdate);
  }),

  // 모임 삭제
  http.delete("http://localhost:4000/gathering/detail/:id", () => {
    return HttpResponse.json(mockGatheringDelete);
  }),
];

export default gatheringHandler;
