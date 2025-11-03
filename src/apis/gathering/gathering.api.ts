import {
  DeleteGatheringRequest,
  GatheringFormData,
  GetGatheringDetailRequest,
  GetGatheringMembersRequest,
  JoinGatheringRequest,
  LeaveGatheringRequest,
  UpdateGatheringRequest,
} from "@/types/gathering";
import api from "../api";

const createGathering = async (data: GatheringFormData) => {
  const { meetingImage, ...formData } = data;

  const form = new FormData();
  form.append("request", JSON.stringify(formData));

  // meetingImage가 있을 때에만 추가
  if (meetingImage) {
    form.append("image", meetingImage);
  }

  const response = await api.post(`/v1/meetings`, form);
  return response.data;
};

const updateGathering = async ({ meetingId, data }: UpdateGatheringRequest) => {
  const { meetingImage, ...formData } = data;

  const form = new FormData();
  form.append("request", JSON.stringify(formData));

  // meetingImage가 있을 때에만 추가
  if (meetingImage) {
    form.append("image", meetingImage);
  }

  const response = await api.put(`/v1/meetings/${meetingId}`, form);
  return response.data;
};

const deleteGathering = async (meetingId: DeleteGatheringRequest) => {
  const response = await api.delete(`/v1/meetings/${meetingId}`);
  return response.data;
};

const getGatheringDetail = async (meetingId: GetGatheringDetailRequest) => {
  const response = await api.get(`/v1/meetings/${meetingId}`);

  return response.data;
};

const joinGathering = async (meetingId: JoinGatheringRequest) => {
  const response = await api.post(`/v1/meetings/${meetingId}/join`);
  return response.data;
};

const leaveGathering = async (meetingId: LeaveGatheringRequest) => {
  const response = await api.delete(`/v1/meetings/${meetingId}/leave`);
  return response.data;
};

const getGatheringMembers = async (meetingId: GetGatheringMembersRequest) => {
  const response = await api.get(`v1/meetings/${meetingId}/members`);
  return response.data;
};

export {
  createGathering,
  deleteGathering,
  getGatheringDetail,
  getGatheringMembers,
  joinGathering,
  leaveGathering,
  updateGathering,
};
