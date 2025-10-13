import { api } from "@/apis/api";
import {
  GatheringFormData,
  GetGatheringDetailRequest,
} from "@/types/gathering";

const createGathering = async (data: GatheringFormData) => {
  try {
    const { meetingImage, ...formData } = data;

    const form = new FormData();
    form.append("request", JSON.stringify(formData));

    // meetingImage가 있을 때에만
    if (meetingImage) {
      form.append("image", meetingImage);
    }

    const response = await api.post(`/meetings`, form);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getGatheringDetail = async (id: GetGatheringDetailRequest) => {
  try {
    const response = await api.get(`/meeting/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createGathering, getGatheringDetail };
