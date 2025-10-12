"use client";

import useGetGatheringDetail from "@/apis/gathering/query/use-get-gathering-detail";
import { MainContent, SideBar } from "@/components/section";

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
    <div className="mx-auto min-h-screen max-w-[1280px] bg-white px-2 pt-[50px] pb-[30.5px] text-neutral-900">
      <div className="tb:flex-row flex flex-col justify-between gap-[30px]">
        <MainContent data={data} />
        <SideBar data={data} />
      </div>
    </div>
  );
};

export default GatheringDetailPage;
