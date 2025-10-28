"use client";

import useGetGatheringDetail from "@/apis/gathering/query/use-get-gathering-detail";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { MainContent, SideBar } from "@/components/section";

import { useParams } from "next/navigation";

const GatheringDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetGatheringDetail(id);
  const { data: userInfo } = useGetUserInfo();

  const isOwner = userInfo?.id === data?.userId;

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
    <div className="pc:px-5 pc:max-w-[1280px] mx-auto min-h-screen bg-white pt-[50px] pb-[30.5px] text-neutral-900">
      <div className="pc:flex-row flex flex-col justify-between gap-[30px]">
        <MainContent data={data} isOwner={isOwner} meetingId={Number(id)} />
        <SideBar data={data} isOwner={isOwner} />
      </div>
    </div>
  );
};

export default GatheringDetailPage;
