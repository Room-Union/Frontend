import { GetGatheringDetailResponse } from "@/types/gathering";

const SideBar = ({ data }: { data: GetGatheringDetailResponse }) => {
  return (
    <div className="right-0 h-fit space-y-6 bg-stone-50 p-6">
      {/* Details */}
      <div className="bg-white p-6">
        <h3 className="mb-4 text-lg font-bold">세부 정보</h3>
        <div className="space-y-3">
          {/* Created At */}
          <div className="flex justify-between border-b border-zinc-100 pb-3">
            <div className="text-sm text-stone-500">모임 생성일</div>
            <div className="text-sm">
              {new Date(data.createdAt).toLocaleDateString("ko-KR")}
            </div>
          </div>

          {/* Join Condition: 일단은 '누구나 참여 가능' 하드코딩 */}
          <div className="flex justify-between">
            <div className="text-sm text-stone-500">참여 조건</div>
            <div className="text-sm">누구나 참여 가능</div>
          </div>
        </div>
      </div>

      {/* Join Button */}
      {/* Todo: isJoined 상태에 따른 스타일링 기능 구현 */}
      <button className="w-full bg-zinc-800 py-3 font-bold text-white">
        모임 참여하기
      </button>

      {/* Host Info */}
      <div className="space-y-4">
        <h3 className="text font-bold">모임장 정보</h3>
        <div className="flex flex-col items-center space-y-2 text-center">
          {/* Host Profile Image*/}
          <div className="-full flex size-20 items-center justify-center bg-zinc-300">
            <span className="text-sm text-stone-500">프로필</span>
          </div>

          {/* Host Nickname */}
          <div>
            <div className="text-center font-bold">{data.nickname}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
