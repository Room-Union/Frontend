import LinkButton from "@/components/ui/button/link-button";
import GatheringCard from "@/components/ui/card/gathering-card";
import Carousel from "@/components/ui/carousel/carousel";
import Empty from "@/assets/icons-colored/empty";
import { GetGatheringCardResponse } from "@/types/gathering-list";

const GatheringList = ({
  title,
  subTitle,
  moreLink,
  gatheringList,
}: {
  title: string;
  moreLink: string;
  subTitle: string;
  gatheringList: GetGatheringCardResponse[];
}) => {
  return (
    <section className="w-full">
      {/* 헤더 */}
      <header className="mb-7 flex flex-row items-center justify-between">
        <div>
          <h2 className="tb:typo-title-sm-semibold text-gray-neutral-900 mo:typo-title-2xs-semibold mb-3">
            {title}
          </h2>
          <h3 className="tb:typo-ui-lg-md sm:typo-ui-sm-medium text-gray-neutral-400">
            {subTitle}
          </h3>
        </div>
        <LinkButton className="sticky right-0" href={`${moreLink}`} />
      </header>

      {/* 캐러셀 컴포넌트*/}
      <section className="pc:mx-0 tb:-mx-6 mo:-mx-5 mx-auto">
        {gatheringList.length > 0 ? (
          <Carousel
            totalItemCount={gatheringList.length}
            listType="gatheringList"
          >
            {gatheringList.map((gathering) => (
              <li
                key={gathering.meetingId}
                className="first:pc:ml-0 first:tb:ml-6 first:mo:ml-5 last:pc:!mr-0 last:!mr-6"
              >
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
        ) : (
          <div className="pc:h-[294px] tb:h-[294px] mo:h-[179px] flex w-full flex-col items-center justify-center">
            <Empty className="h-[142px] w-[217px]" />
            <span className="typo-ui-lg-medium text-gray-neutral-400">
              아직 만들어진 모임이 없어요
            </span>
          </div>
        )}
      </section>
    </section>
  );
};

export default GatheringList;
