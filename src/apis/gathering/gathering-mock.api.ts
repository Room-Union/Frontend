import {
  DeleteGatheringRequest,
  GatheringFormData,
  GetGatheringDetailRequest,
  GetGatheringDetailResponse,
  JoinGatheringRequest,
  UpdateGatheringRequest,
} from "@/types/gathering";
import api from "../api";

// 모임 생성 테스트
const createGatheringTest = async (data: GatheringFormData) => {
  const res = await api.post(`/v1/meetings`, data);
  return res.data;
};

// 모임 상세 페이지 조회 테스트
const getGatheringDetailTest = async (
  meetingId: GetGatheringDetailRequest
): Promise<GetGatheringDetailResponse> => {
  const res = await api.get(`/v1/meetings/${meetingId}`);
  return res.data;
};

// 모임 수정 테스트
const updateGatheringTest = async ({
  meetingId,
  data,
}: UpdateGatheringRequest) => {
  const res = await api.put(`/v1/meetings/${meetingId}`, { data });
  return res.data;
};

// 모임 삭제 테스트
const deleteGatheringTest = async (meetingId: DeleteGatheringRequest) => {
  const res = await api.delete(`/v1/meetings/${meetingId}`);
  return res.data;
};

// 모임 참가 테스트
const joinGatheringTest = async (meetingId: JoinGatheringRequest) => {
  const res = await api.post(`/v1/meetings/${meetingId}/join`);
  return res.data;
};

export {
  createGatheringTest,
  deleteGatheringTest,
  getGatheringDetailTest,
  joinGatheringTest,
  updateGatheringTest,
};
