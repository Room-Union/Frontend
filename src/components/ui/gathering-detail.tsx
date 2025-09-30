"use client";

import useGetGatheringDetail from "@/apis/gathering/query/use-get-gathering-detail";
import { useParams } from "next/navigation";

const GatheringDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetGatheringDetail(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Todo: Header 추가하기 */}

      {/* Body */}
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Image Banner */}
            <div className="flex h-72 items-center justify-center bg-neutral-200">
              <span className="text-stone-500">[관련 이미지 배너]</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold">{data.title}</h1>

            {/* Category */}
            <div className="inline-block bg-zinc-300 px-3 py-1 text-sm text-zinc-800">
              {data.category}
            </div>

            {/* MemberCount */}
            <div className="text-base">
              👥 {data.currentMemberCount}/{data.maxMemberCount}명 참여 중
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold">모임 설명</h2>
              <div className="bg-stone-50 p-6">
                <p className="leading-7 text-zinc-800">{data.description}</p>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">모임 일정</h2>
                <button className="text-stone-500">더보기</button>
              </div>

              {/* Todo: Schedule Cards 추가하기 */}
              <div className="flex h-[200px] w-full items-center justify-center bg-stone-50">
                <p>Schedule Cards 추가하기</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="right-0 h-fit space-y-6 bg-stone-50 p-6">
            {/* Details */}
            <div className="bg-white p-6">
              <h3 className="mb-4 text-lg font-bold">세부 정보</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-zinc-100 pb-3">
                  <div className="text-sm text-stone-500">모임 생성일</div>
                  <div className="text-sm">
                    {new Date(data.createdAt).toLocaleDateString("ko-KR")}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-stone-500">참여 조건</div>
                  <div className="text-sm">누구나 참여 가능</div>
                </div>
              </div>
            </div>

            {/* Join Button */}
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
                  <div className="text-center font-bold">
                    {data.host.nickname}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatheringDetail;
