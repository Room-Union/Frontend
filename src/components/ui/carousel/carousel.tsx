import CarouselButton from '@/components/ui/button/carousel-button'
import ChevronRightIcon from '@/assets/icons/chevron-right'
import ChevronLeftIcon from '@/assets/icons/chevron-left'
import { cn } from '@/utils/cn'

interface CarouselProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    // 데이터 설정
    list: T[],
    // 렌더링 방식 설정
    renderItem: (item: T) => React.ReactNode,
    // 데이터 키 설정
    itemKey: (item: T) => React.Key,
    className?: string,
}

const Carousel = <T,>({ list, renderItem, itemKey, className, ...props }: CarouselProps<T>) => {
    return (
        <div className={cn("relative", className)} {...props}>
            {/* 모임 리스트 */}
            <ul className="flex flex-row gap-5 overflow-hidden">
                {list.map((item) => (
                    <li key={itemKey(item)}>{renderItem(item)}</li>
                ))}
            </ul>

            {/* 왼쪽 버튼 */}
            <CarouselButton className="absolute left-[-30px] top-[77px]">
                <ChevronLeftIcon className="w-4 h-4 text-gray-neutral-600 group-disabled:text-gray-neutral-300" />
            </CarouselButton>

            {/* 오른쪽 버튼 */}
            <CarouselButton className="absolute right-[-30px] top-[77px]">
                <ChevronRightIcon className="w-4 h-4 text-gray-neutral-600 group-disabled:text-gray-neutral-300" />
            </CarouselButton>
        </div>
    )
}

export default Carousel