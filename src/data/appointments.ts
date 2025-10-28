import { GetAppointmentResponse } from "@/types/appointment";

const mockGetAppointments: GetAppointmentResponse[] = [
  {
    id: 1,
    title: "오후 8시 순정 영화 봐요",
    scheduledAt: "2025-10-28T20:00:00.000+09:00",
    maxMemberCount: 10,
    currentMemberCount: 5,
    creatorId: 1,
    isJoined: false,
    image: undefined,
  },
  {
    id: 2,
    title: "오후 6시 말할 수 없는 비밀",
    scheduledAt: "2025-10-28T18:00:00.000+09:00",
    maxMemberCount: 20,
    currentMemberCount: 15,
    creatorId: 1,
    isJoined: false,
    image: undefined,
  },
];

export { mockGetAppointments };
