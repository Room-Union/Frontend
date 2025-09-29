import {
  CreateGatheringRequest,
  DeleteGatheringRequest,
  GetGatheringDetailResponse,
  UpdateGatheringRequest,
} from "@/types/gathering";
import axios from "axios";

// 모임 생성
const createGathering = async (data: CreateGatheringRequest) => {
  const res = await axios.post("http://localhost:4000/gathering/create", data);
  return res.data;
};

// 모임 상세 페이지 조회
const getGatheringDetail = async (
  id: number
): Promise<GetGatheringDetailResponse> => {
  const res = await axios.get(`http://localhost:4000/gathering/detail/${id}`);
  return res.data;
};

// 모임 수정
const updateGathering = async (
  id: number,
  data: UpdateGatheringRequest
): Promise<UpdateGatheringRequest> => {
  const res = await axios.patch(
    `http://localhost:4000/gathering/detail/${id}`,
    data
  );
  return res.data;
};

// 모임 삭제
const deleteGathering = async (id: number): Promise<DeleteGatheringRequest> => {
  const res = await axios.delete(
    `http://localhost:4000/gathering/detail/${id}`
  );
  return res.data;
};

export {
  createGathering,
  deleteGathering,
  getGatheringDetail,
  updateGathering,
};
