import { CalendarX } from "@/assets/icons";
import MeetUpCard from "@/components/ui/card/meet-up-card";
import { GetAppointmentResponse } from "@/types/appointments";

const Schedules = () => {
  const schedules: GetAppointmentResponse[] = [
    {
      id: 1,
      title: "모임 일정",
      scheduledAt: "2021-01-01T00:00:00.000Z",
      currentMemberCount: 1,
      maxMemberCount: 10,
      creatorId: 1,
      imageUrl: "",
      isJoined: false,
    },
  ]; // Todo: 모임 일정 데이터 추가하기

  // TODO: 실제 데이터로 대체 필요
  const isOwner = false;
  const meetingId = 0;
  const isGatheringJoined = false;

  if (schedules.length === 0) {
    return (
      <div className="flex h-[54px] flex-col items-center justify-center gap-[10px]">
        <CalendarX
          className="size-[30px] stroke-none text-neutral-300"
          role="img"
          aria-hidden="true"
        />
        <p className="typo-ui-sm-semibold text-neutral-300">
          생성된 약속이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <>
      {schedules.map((schedule) => (
        <MeetUpCard
          key={schedule.id}
          data={schedule}
          isOwner={isOwner}
          meetingId={meetingId}
          isGatheringJoined={isGatheringJoined}
        />
      ))}
    </>
  );
};

export default Schedules;
