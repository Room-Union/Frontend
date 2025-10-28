import {
  CreateAppointmentRequest,
  GetAppointmentResponse,
} from "@/types/appointments";
import { api } from "../api";

const createAppointment = async ({
  meetingId,
  data,
}: CreateAppointmentRequest) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("scheduledAt", data.scheduledAt);
  formData.append("maxMemberCount", String(data.maxMemberCount));

  // 이미지가 있을 때에만 추가
  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api.post(
    `/meetings/${meetingId}/appointments`,
    formData
  );
  return response.data;
};

const getAppointments = async (
  meetingId: number
): Promise<GetAppointmentResponse[]> => {
  const response = await api.get(`/meetings/${meetingId}/appointments`);

  return response.data.appointments;
};

export { createAppointment, getAppointments };
