import { api } from "@/apis/api";

const getGatheringDetail = async (id: number) => {
  try {
    const response = await api.get(`/meeting/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getGatheringDetail };
