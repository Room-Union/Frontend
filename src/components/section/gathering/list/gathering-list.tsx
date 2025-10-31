import Empty from "@/assets/icons-colored/empty";
import Button from "@/components/ui/button/button";
import GatheringCard from "@/components/ui/card/gathering-card";
import Carousel from "@/components/ui/carousel/carousel";
import { GetGatheringCardResponse } from "@/types/gathering-list";

const GatheringList = ({
  title,
  subTitle,
  moreLink,
  gatheringList,
}: {
  title: string;
  moreLink: { pathname: string; query: Record<string, string> };
  subTitle?: string;
  gatheringList: GetGatheringCardResponse[];
}) => {
  return (
    <section className="w-full">
      {/* 헤더 */}
      <header className="pc:mb-7 mo:mb-[22px] flex flex-row items-center justify-between">
        <div>
          <h2 className="tb:typo-title-sm-semibold text-gray-neutral-900 mo:typo-title-2xs-semibold pc:mb-3 mo:mb-2">
            {title}
          </h2>
          <h3 className="tb:typo-ui-lg-medium mo:typo-ui-sm-medium text-gray-neutral-400">
            {subTitle}
          </h3>
        </div>
        <Button variant="underline" size="text" href={moreLink}>
          더보기
        </Button>
      </header>

      {/* 캐러셀 컴포넌트*/}
      <section className="pc:mx-0 tb:-mx-6 mo:-mx-5">
        {gatheringList.length > 0 ? (
          <Carousel
            totalItemCount={gatheringList.length}
            listType="gatheringList"
          >
            {gatheringList.map((gathering) => (
              <li
                key={gathering.meetingId}
                className="pc:first:ml-0 tb:first:ml-6 mo:first:ml-5 pc:last:mr-0 tb:last:mr-6 mo:last:mr-5"
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
