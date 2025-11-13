import { mockGetAppointments } from "@/data/appointments";
import { AppointmentFormData } from "@/types/appointments";
import { http, HttpResponse } from "msw";

const appointmentsHandler = [
  // 약속 생성
  http.post("*/v1/meetings/:id/appointments", async ({ request }) => {
    const inputData = (await request.json()) as AppointmentFormData;

    const createdAppointment = {
      id: Date.now(),
      title: inputData.title,
      scheduledAt: inputData.scheduledAt,
      maxMemberCount: inputData.maxMemberCount,
      currentMemberCount: 1,
      creatorId: 1,
      isJoined: false,
      imageUrl: inputData.image ? "" : undefined,
    };

    return HttpResponse.json(createdAppointment);
  }),

  // 약속 목록 조회
  http.get("*/v1/meetings/:id/appointments", () => {
    return HttpResponse.json({ appointments: mockGetAppointments });
  }),

  // 약속 수정
  http.put(
    "*/v1/meetings/:meetingId/appointments/:appointmentId",
    async ({ request, params }) => {
      const appointmentId = Number(params.appointmentId);
      const inputData = (await request.json()) as AppointmentFormData;

      const updatedAppointment = {
        id: appointmentId,
        title: inputData.title,
        scheduledAt: inputData.scheduledAt,
        maxMemberCount: inputData.maxMemberCount,
        currentMemberCount: 5,
        creatorId: 1,
        isJoined: false,
        imageUrl: inputData.image ? "" : undefined,
      };

      return HttpResponse.json(updatedAppointment);
    }
  ),

  // 약속 삭제
  http.delete(
    "*/v1/meetings/:meetingId/appointments/:appointmentId",
    ({ params }) => {
      const appointmentId = Number(params.appointmentId);
      return HttpResponse.json({ id: appointmentId, appointmentId });
    }
  ),

  // 약속 참가
  http.post(
    "*/v1/meetings/:meetingId/appointments/:appointmentId/join",
    ({ params }) => {
      const appointmentId = Number(params.appointmentId);
      return HttpResponse.json({
        id: appointmentId,
        message: "약속에 참가했습니다.",
      });
    }
  ),

  // 약속 탈퇴
  http.delete(
    "*/v1/meetings/:meetingId/appointments/:appointmentId/leave",
    ({ params }) => {
      const appointmentId = Number(params.appointmentId);
      return HttpResponse.json({
        id: appointmentId,
        message: "약속에서 탈퇴했습니다.",
      });
    }
  ),
];

export default appointmentsHandler;
