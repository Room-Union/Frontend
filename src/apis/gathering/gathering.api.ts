import { api } from "@/apis/api";
import {
  GatheringFormData,
  GetGatheringDetailRequest,
  UpdateGatheringRequest,
} from "@/types/gathering";

const createGathering = async (data: GatheringFormData) => {
  const { meetingImage, ...formData } = data;

  const form = new FormData();
  form.append("request", JSON.stringify(formData));

  // meetingImage가 있을 때에만 추가
  if (meetingImage) {
    form.append("image", meetingImage);
  }

  const response = await api.post(`/meetings`, form);
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

  const response = await api.put(`/meetings/${meetingId}`, form);
  return response.data;
};

const getGatheringDetail = async (meetingId: GetGatheringDetailRequest) => {
  const response = await api.get(`/meetings/${meetingId}`);

  return response.data;
};

export { createGathering, getGatheringDetail, updateGathering };
