import { CreateAppointmentRequest } from "@/types/appointments";
import api from "../api";

const createAppointmentTest = async ({
  meetingId,
  data,
}: {
  meetingId: number;
  data: CreateAppointmentRequest;
}) => {
  const res = await api.post(`/v1/meetings/${meetingId}/appointments`, data);
  return res.data;
};

const getAppointmentsTest = async (meetingId: number) => {
  const res = await api.get(`/v1/meetings/${meetingId}/appointments`);
  return res.data.appointments || res.data;
};

export { createAppointmentTest, getAppointmentsTest };
