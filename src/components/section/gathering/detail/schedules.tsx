import { CalendarX } from "@/assets/icons";
import MeetUpCard from "@/components/ui/card/meet-up-card";
import { Schedule } from "@/types/schedules";

const Schedules = () => {
  const schedules: Schedule[] = []; // Todo: 모임 일정 데이터 추가하기

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
        <MeetUpCard key={schedule.id} size="lg" data={schedule} />
      ))}
    </>
  );
};

export default Schedules;
