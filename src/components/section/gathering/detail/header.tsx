import useDeleteGathering from "@/apis/gathering/mutation/use-delete-gathering";
import { Meetballs } from "@/assets/icons";
import { EmptyImage } from "@/assets/icons-colored";
import { Button, CategoryBadge } from "@/components/ui";
import type { GetGatheringDetailResponse } from "@/types/gathering";
import { formatDate } from "@/utils/format-date";
import Image from "next/image";

interface GattheringHeaderProps {
  data: GetGatheringDetailResponse;
  isOwner: boolean;
}

const GattheringHeader = ({ data, isOwner }: GattheringHeaderProps) => {
  const { mutate: deleteGathering } = useDeleteGathering();

  const handleClick = () => {
    deleteGathering(data.meetingId, {
      onSuccess: () => {
        // Todo: 모임 삭제 후 목록 페이지로 이동
      },
    });
  };

  return (
    <div>
      {/* Image Banner */}
      <div className="relative h-[197.5px] w-full overflow-hidden rounded-3xl bg-neutral-100">
        {data.meetingImage ? (
          <Image
            src={data.meetingImage}
            alt={data.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-end justify-center">
            <EmptyImage className="h-auto w-full max-w-[500px]" />
          </div>
        )}
      </div>

      {/* Title & Category & CreatedAt */}
      <div className="space-y-[6px] py-6">
        {/* Title & Edit Button */}
        <div className="flex items-center justify-between">
          <h2 className="typo-title-md-bold h-10">{data.name}</h2>
          {isOwner && (
            // Todo: Dropdown 버튼 추가
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none"
              onClick={handleClick}
            >
              <Meetballs className="size-6 text-[#A4A4A4]" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-[10px]">
          {/* Category */}
          <CategoryBadge
            category={data.category}
            size="sm"
            className="tb:px-2 tb:py-1.5 tb:typo-ui-sm-medium tb:tracking-[-0.3px]"
          />

          {/* CreatedAt */}
          <div className="typo-body-sm-medium text-neutral-400">
            <span>생성일 {formatDate(data.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GattheringHeader;
