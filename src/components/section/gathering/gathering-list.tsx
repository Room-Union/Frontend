import { GetGatheringListResponse } from '@/types/gathering-list'
import GatheringCard from '@/components/ui/card/gathering-card'
import SeeMoreButton from '@/components/ui/button/see-more-button'
import Carousel from '@/components/ui/carousel/carousel'

const GatheringList = ({
    title,
    subTitle,
    gatheringList
}: {
    title: string,
    subTitle: string,
    gatheringList: GetGatheringListResponse
}) => {
    return (
        <section className="w-[1200px]">
            {/* 헤더 */}
            <header className="flex flex-row justify-between items-center mb-7">
                <div>
                    <h2 className="typo-title-sm-semibold text-gray-neutral-900 mb-3">
                        {title}
                    </h2>
                    <h3 className="typo-ui-lg-md text-gray-neutral-400">
                        {subTitle}
                    </h3>
                </div>
                <SeeMoreButton className="sticky right-0" href="/" />
            </header>

            {/* 캐러셀 컴포넌트*/}
            <Carousel
                //  데이터 설정
                list={gatheringList}
                itemKey={(gathering) => gathering.id}
                // 렌더링 방식 설정
                renderItem={(gathering) => (
                    <GatheringCard gatheringInfo={{
                        id: gathering.id,
                        title: gathering.title,
                        category: gathering.category,
                        image: gathering.image,
                        currentMemberCount: gathering.currentMemberCount,
                        maxMemberCount: gathering.maxMemberCount,
                        status: gathering.status,
                    }}
                    />
                )}
            />
        </section>
    )
}

export default GatheringList