import {
  CreateGathering,
  DeleteGathering,
  GatheringDetail,
  UpdateGathering,
} from "@/types/gathering";
import axios from "axios";

// 모임 생성
const createGathering = async (data: CreateGathering) => {
  const res = await axios.post("http://localhost:4000/gathering/create", data);
  return res.data;
};

// 모임 상세 페이지 조회
const getGatheringDetail = async (id: number): Promise<GatheringDetail> => {
  const res = await axios.get(`http://localhost:4000/gathering/detail/${id}`);
  return res.data;
};

// 모임 수정
const updateGathering = async (
  id: number,
  data: UpdateGathering
): Promise<UpdateGathering> => {
  const res = await axios.patch(
    `http://localhost:4000/gathering/detail/${id}`,
    data
  );
  return res.data;
};

// 모임 삭제
const deleteGathering = async (id: number): Promise<DeleteGathering> => {
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
