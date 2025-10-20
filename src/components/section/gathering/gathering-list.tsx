import LinkButton from "@/components/ui/button/link-button";
import GatheringCard from "@/components/ui/card/gathering-card";
import Carousel from "@/components/ui/carousel/carousel";
import { GetGatheringListResponse } from "@/types/gathering-list";

const GatheringList = ({
  title,
  subTitle,
  gatheringList,
}: {
  title: string;
  subTitle: string;
  gatheringList: GetGatheringListResponse;
}) => {
  return (
    <section className="w-auto">
      {/* 헤더 */}
      <header className="mb-7 flex flex-row items-center justify-between">
        <div>
          <h2 className="typo-title-sm-semibold text-gray-neutral-900 mb-3">
            {title}
          </h2>
          <h3 className="typo-ui-lg-md text-gray-neutral-400">{subTitle}</h3>
        </div>
        <LinkButton className="sticky right-0" href="/" />
      </header>

      {/* 캐러셀 컴포넌트*/}
      <Carousel totalItemCount={gatheringList.length} listType="gatheringList">
        {gatheringList.map((gathering) => (
          <li key={gathering.meetingId}>
            <GatheringCard
              gatheringInfo={{
                meetingId: gathering.meetingId,
                name: gathering.name,
                description: gathering.description,
                meetingImage: gathering.meetingImage,
                category: gathering.category,
                currentMemberCount: gathering.currentMemberCount,
                maxMemberCount: gathering.maxMemberCount,
                platformURL: gathering.platformURL,
                userId: gathering.userId,
                createdAt: gathering.createdAt,
                badges: gathering.badges,
                joined: gathering.joined,
              }}
            />
          </li>
        ))}
      </Carousel>
    </section>
  );
};

export default GatheringList;
