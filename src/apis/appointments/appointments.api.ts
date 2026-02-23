import {
  CreateAppointmentRequest,
  DeleteAppointmentRequest,
  GetAppointmentResponse,
  JoinAppointmentRequest,
  LeaveAppointmentRequest,
  UpdateAppointmentRequest,
} from "@/types/appointments";
import api from "../api";

const createAppointment = async ({
  meetingId,
  data,
}: CreateAppointmentRequest) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("scheduledAt", data.scheduledAt);
  formData.append("maxMemberCount", String(data.maxMemberCount));

  if (data.image) {
    formData.append("image", data.image);
  }

  await api.post(`/v1/meetings/${meetingId}/appointments`, formData);

  return true;
};

const getAppointments = async (
  meetingId: number
): Promise<GetAppointmentResponse[]> => {
  const response = await api.get(`/v1/meetings/${meetingId}/appointments`);

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

  if (data.image) {
    formData.append("image", data.image);
  }

  await api.put(
    `/v1/meetings/${meetingId}/appointments/${appointmentId}`,
    formData
  );

  return true;
};

const deleteAppointment = async ({
  meetingId,
  appointmentId,
}: DeleteAppointmentRequest) => {
  await api.delete(`/v1/meetings/${meetingId}/appointments/${appointmentId}`);

  return true;
};

const joinAppointment = async ({
  meetingId,
  appointmentId,
}: JoinAppointmentRequest) => {
  await api.post(
    `/v1/meetings/${meetingId}/appointments/${appointmentId}/join`
  );

  return true;
};

const leaveAppointment = async ({
  meetingId,
  appointmentId,
}: LeaveAppointmentRequest) => {
  await api.delete(
    `/v1/meetings/${meetingId}/appointments/${appointmentId}/leave`
  );

  return true;
};

export {
  createAppointment,
  deleteAppointment,
  getAppointments,
  joinAppointment,
  leaveAppointment,
  updateAppointment,
};
