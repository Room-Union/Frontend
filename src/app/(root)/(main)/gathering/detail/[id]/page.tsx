"use client";
import useGetGatheringDetail from "@/apis/gathering/query/use-get-gathering-detail";
import { Plus } from "@/assets/icons";
import { MainContent, SideBar } from "@/components/section";
import GatheringDetailSkeleton from "@/components/section/fallback/gathering-detail-skeleton";
import { Button } from "@/components/ui";
import CreateAppointmentModal from "@/components/ui/modal/gathering/appointments/create-appointment-modal";
import { Suspense } from "react";

import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { useParams } from "next/navigation";

const GatheringDetailRoute = () => {
  const { id } = useParams<{ id: string }>();
  const meetingId = Number(id);

  return (
    <Suspense fallback={<GatheringDetailSkeleton />}>
      <GatheringDetailContent meetingId={meetingId} />
    </Suspense>
  );
};

const GatheringDetailContent = ({ meetingId }: { meetingId: number }) => {
  const { data } = useGetGatheringDetail(meetingId);
  const { data: user } = useGetUserInfo();
  const userId = user && Number(user.id);
  const isOwner = userId === data?.userId;

  return (
    <div className="pc:max-w-[1280px] pc:pt-12 tb:pt-9 mo:pt-[25px] pc:pb-[30.5px] mx-auto bg-white pb-0 text-neutral-900">
      <div className="pc:flex-row flex flex-col justify-between gap-[30px]">
        <MainContent data={data} isOwner={isOwner} meetingId={meetingId} />
        <SideBar data={data} isOwner={isOwner} />
      </div>
      {isOwner && (
        <aside className="pc:sticky pc:right-6 pc:bottom-5 pc:z-10 pc:ml-auto pc:block hidden w-fit">
          <CreateAppointmentModal
            meetingId={meetingId}
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

export default GatheringDetailRoute;
