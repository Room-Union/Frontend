import { GatheringListSkeleton, UserProfile } from "@/components/section";
import UserProfileSkeleton from "@/components/section/fallback/user-profile-skeleton";
import {
  HostGatherings,
  MemberGatherings,
} from "@/components/section/user/gatherings";
import { Suspense } from "react";

const MyPage = () => {
  return (
    <div className="pc:pt-[50px] tb:pt-9 mo:pt-6 pc:gap-[74px] tb:gap-[50px] mo:gap-10 pc:pb-[107px] tb:pb-[160px] mo:pb-[93px] flex flex-col bg-white">
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfile />
      </Suspense>

      <div className="tb:gap-[74px] mo:gap-15 flex flex-col">
        <Suspense fallback={<GatheringListSkeleton subTitle={false} />}>
          <HostGatherings />
        </Suspense>
        <Suspense fallback={<GatheringListSkeleton subTitle={false} />}>
          <MemberGatherings />
        </Suspense>
      </div>
    </div>
  );
};

export default MyPage;
