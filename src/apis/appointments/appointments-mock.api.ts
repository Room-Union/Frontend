import { api } from "@/apis/api";
import { CreateAppointmentRequest } from "@/types/appointments";

const createAppointmentTest = async ({
  meetingId,
  data,
}: {
  meetingId: number;
  data: CreateAppointmentRequest;
}) => {
  const res = await api.post(`/meetings/${meetingId}/appointments`, data);
  return res.data;
};

const getAppointmentsTest = async (meetingId: number) => {
  const res = await api.get(`/meetings/${meetingId}/appointments`);
  return res.data.appointments || res.data;
};

export { createAppointmentTest, getAppointmentsTest };
