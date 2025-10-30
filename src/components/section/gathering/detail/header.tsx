"use client";

import useDeleteGathering from "@/apis/gathering/mutation/use-delete-gathering";
import { Meetballs, Trash } from "@/assets/icons";
import { EmptyImage } from "@/assets/icons-colored";
import { CategoryBadge, Dropdown } from "@/components/ui";
import { useModalStore } from "@/store/modal-store";
import { useToastStore } from "@/store/toast-store";
import type { GetGatheringDetailResponse } from "@/types/gathering";
import { formatDate } from "@/utils/format-date";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface GattheringHeaderProps {
  data: GetGatheringDetailResponse;
  isOwner: boolean;
}

const GattheringHeader = ({ data, isOwner }: GattheringHeaderProps) => {
  const router = useRouter();
  const { toast } = useToastStore();
  const { alertModal } = useModalStore();
  const { mutate: deleteGathering } = useDeleteGathering();

  const handleClick = () => {
    alertModal({
      message: "모임을 삭제하시겠습니까?",
      description: "삭제 후 복구가 불가능합니다.",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        deleteGathering(data.meetingId, {
          onSuccess: () => {
            router.back();
            toast({ type: "normal", message: "모임이 삭제 되었습니다." });
          },
          onError: () => {
            // Todo: 모임 삭제 실패 처리
            toast({ type: "error", message: "모임 삭제에 실패했습니다." });
          },
        });
      },
    });
  };

  return (
    <div>
      {/* Image Banner */}
      <div className="tb:rounded-3xl relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
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
      <div className="tb:py-6 space-y-[6px] py-4.5">
        {/* Title & Edit Button */}
        <div className="flex items-center justify-between">
          <h2 className="pc:typo-title-md-bold tb:h-10 tb:typo-title-sm-bold typo-title-xs-bold h-6 truncate">
            {data.name}
          </h2>
          {isOwner && (
            // Todo: Dropdown 버튼 추가
            <Dropdown
              trigger={<Meetballs className="size-6 text-[#A4A4A4]" />}
              contentAlign="end"
              itemClassName="text-red-500"
              items={[
                {
                  icon: <Trash className="size-[18px] stroke-none" />,
                  text: "삭제",
                  onClick: handleClick,
                },
              ]}
            />
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
