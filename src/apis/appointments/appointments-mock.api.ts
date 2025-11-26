import {
  CreateAppointmentRequest,
  DeleteAppointmentRequest,
  JoinAppointmentRequest,
  LeaveAppointmentRequest,
  UpdateAppointmentRequest,
} from "@/types/appointments";
import api from "../api";

const createAppointmentTest = async ({
  meetingId,
  data,
}: CreateAppointmentRequest) => {
  const res = await api.post(`/v1/meetings/${meetingId}/appointments`, data);
  return res.data;
};

const getAppointmentsTest = async (meetingId: number) => {
  const res = await api.get(`/v1/meetings/${meetingId}/appointments`);
  return res.data.appointments;
};

const updateAppointmentTest = async ({
  meetingId,
  appointmentId,
  data,
}: UpdateAppointmentRequest) => {
  const res = await api.put(
    `/v1/meetings/${meetingId}/appointments/${appointmentId}`,
    data
  );
  return res.data;
};

const deleteAppointmentTest = async ({
  meetingId,
  appointmentId,
}: DeleteAppointmentRequest) => {
  await api.delete(`/v1/meetings/${meetingId}/appointments/${appointmentId}`);
  return true;
};

const joinAppointmentTest = async ({
  meetingId,
  appointmentId,
}: JoinAppointmentRequest) => {
  await api.post(
    `/v1/meetings/${meetingId}/appointments/${appointmentId}/join`
  );
  return true;
};

const leaveAppointmentTest = async ({
  meetingId,
  appointmentId,
}: LeaveAppointmentRequest) => {
  await api.delete(
    `/v1/meetings/${meetingId}/appointments/${appointmentId}/leave`
  );
  return true;
};

export {
  createAppointmentTest,
  deleteAppointmentTest,
  getAppointmentsTest,
  joinAppointmentTest,
  leaveAppointmentTest,
  updateAppointmentTest,
};
