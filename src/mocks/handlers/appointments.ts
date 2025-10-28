import { mockGetAppointments } from "@/data/appointments";
import { CreateAppointmentRequest } from "@/types/appointment";
import { http, HttpResponse } from "msw";

const appointmentsHandler = [
  // 약속 생성
  http.post("*/v1/meetings/:id/appointments", async ({ request }) => {
    const inputData = (await request.json()) as CreateAppointmentRequest;

    const createdAppointment = {
      id: Date.now(),
      title: inputData.title,
      scheduledAt: inputData.scheduledAt,
      maxMemberCount: inputData.maxMemberCount,
      image: inputData.image || "",
    };

    return HttpResponse.json(createdAppointment);
  }),

  // 약속 목록 조회
  http.get("*/v1/meetings/:id/appointments", () => {
    return HttpResponse.json(mockGetAppointments);
  }),
];

export default appointmentsHandler;
