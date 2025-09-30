"use client";

import useGetGatheringDetail from "@/apis/gathering/query/use-get-gathering-detail";
import MainContent from "@/components/section/gathering/main-content";
import SideBar from "@/components/section/gathering/side-bar";

import { useParams } from "next/navigation";

const GatheringDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetGatheringDetail(id);

  // Todo: 에러 바운더리, Suspense를 사용할지 고민
  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        모임 정보를 불러오는데 실패했습니다.
      </div>
    );

  if (!data)
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        모임 정보가 없습니다.
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Todo: Header 추가하기 */}

      {/* Body */}
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <MainContent data={data} />

          {/* Sidebar */}
          <SideBar data={data} />
        </div>
      </div>
    </div>
  );
};

export default GatheringDetailPage;
