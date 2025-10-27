import {
  DeleteGatheringRequest,
  GatheringFormData,
  GetGatheringDetailRequest,
  GetGatheringDetailResponse,
  JoinGatheringRequest,
  UpdateGatheringRequest,
} from "@/types/gathering";
import axios from "axios";

// 모임 생성 테스트
const createGatheringTest = async (data: GatheringFormData) => {
  const res = await axios.post("http://localhost:4000/gathering/create", data);
  return res.data;
};

// 모임 상세 페이지 조회 테스트
const getGatheringDetailTest = async (
  meetingId: GetGatheringDetailRequest
): Promise<GetGatheringDetailResponse> => {
  const res = await axios.get(
    `http://localhost:4000/gathering/detail/${meetingId}`
  );
  return res.data;
};

// 모임 수정 테스트
const updateGatheringTest = async ({
  meetingId,
  data,
}: UpdateGatheringRequest) => {
  const res = await axios.put(
    `http://localhost:4000/gathering/detail/${meetingId}`,
    { data }
  );
  return res.data;
};

// 모임 삭제 테스트
const deleteGatheringTest = async (meetingId: DeleteGatheringRequest) => {
  const res = await axios.delete(
    `http://localhost:4000/gathering/detail/${meetingId}`
  );
  return res.data;
};

// 모임 참가 테스트
const joinGatheringTest = async (meetingId: JoinGatheringRequest) => {
  const res = await axios.post(
    `http://localhost:4000/gathering/${meetingId}/join`
  );
  return res.data;
};

export {
  createGatheringTest,
  deleteGatheringTest,
  getGatheringDetailTest,
  joinGatheringTest,
  updateGatheringTest,
};
