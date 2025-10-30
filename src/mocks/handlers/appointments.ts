import { mockGetAppointments } from "@/data/appointments";
import { CreateAppointmentRequest } from "@/types/appointments";
import { http, HttpResponse } from "msw";

const appointmentsHandler = [
  // 약속 생성
  http.post("*/v1/meetings/:id/appointments", async ({ request }) => {
    const inputData = (await request.json()) as CreateAppointmentRequest;

    const createdAppointment = {
      id: Date.now(),
      title: inputData.data.title,
      scheduledAt: inputData.data.scheduledAt,
      maxMemberCount: inputData.data.maxMemberCount,
      image: inputData.data.image || "",
    };

    return HttpResponse.json(createdAppointment);
  }),

  // 약속 목록 조회
  http.get("*/v1/meetings/:id/appointments", () => {
    return HttpResponse.json(mockGetAppointments);
  }),
];

export default appointmentsHandler;
