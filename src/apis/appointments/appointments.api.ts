import {
  CreateAppointmentRequest,
  DeleteAppointmentRequest,
  GetAppointmentResponse,
  UpdateAppointmentRequest,
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

const updateAppointment = async ({
  meetingId,
  appointmentId,
  data,
}: UpdateAppointmentRequest) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("scheduledAt", data.scheduledAt);
  formData.append("maxMemberCount", String(data.maxMemberCount));

  // 이미지가 있을 때에만 추가
  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api.put(
    `/meetings/${meetingId}/appointments/${appointmentId}`,
    formData
  );
  return response.data;
};

const deleteAppointment = async ({
  meetingId,
  appointmentId,
}: DeleteAppointmentRequest) => {
  const response = await api.delete(
    `/meetings/${meetingId}/appointments/${appointmentId}`
  );
  return response.data;
};

export {
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
};
