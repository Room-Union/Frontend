import { CalendarX } from "@/assets/icons";

const Schedules = () => {
  const schedules = []; // Todo: 모임 일정 데이터 추가하기

  return (
    <div className="border-t border-neutral-100 py-[30px]">
      <h3 className="typo-title-xs-bold pb-[14px] text-neutral-800">
        모임 약속
      </h3>

      {schedules.length > 0 && (
        <div className="flex h-[200px] w-full items-center justify-center bg-stone-50">
          <p>Schedule Item 추가하기</p>
        </div>
      )}

      {/* Todo: Schedule Item 추가하기 */}
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
    </div>
  );
};

export default Schedules;
