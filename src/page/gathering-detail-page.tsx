"use client";

import useGetGatheringDetail from "@/apis/gathering/query/use-get-gathering-detail";
import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { Plus } from "@/assets/icons";
import { MainContent, SideBar } from "@/components/section";
import { Button } from "@/components/ui";
import CreateAppointmentModal from "@/components/ui/modal/gathering/appointments/create-appointment-modal";

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
    <div className="pc:max-w-[1280px] mx-auto min-h-screen bg-white pt-12 pb-[30.5px] text-neutral-900">
      <div className="pc:flex-row flex flex-col justify-between gap-[30px]">
        <MainContent data={data} isOwner={isOwner} meetingId={Number(id)} />
        <SideBar data={data} isOwner={isOwner} />
      </div>
      {isOwner && (
        <aside className="pc:sticky pc:right-6 pc:bottom-5 pc:z-50 pc:ml-auto pc:block hidden w-fit">
          <CreateAppointmentModal
            meetingId={Number(id)}
            trigger={
              <Button variant="primary" size="pill_icon" className="gap-2.5">
                <Plus className="size-[22px] stroke-none" />
                <span className="typo-title-xs-semibold tb:block hidden">
                  약속 생성
                </span>
              </Button>
            }
          />
        </aside>
      )}
    </div>
  );
};

export default GatheringDetailPage;
