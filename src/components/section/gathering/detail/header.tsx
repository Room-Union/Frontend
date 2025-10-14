import CategoryBadge from "@/components/ui/badges/category-badge";
import { GetGatheringDetailResponse } from "@/types/gathering";
import formatDate from "@/utils/format-date";
import Image from "next/image";

interface GattheringHeaderProps {
  data: GetGatheringDetailResponse;
}

const GattheringHeader = ({ data }: GattheringHeaderProps) => {
  return (
    <div>
      {/* Image Banner */}
      {data.meetingImage ? (
        <div className="relative h-[197.5px] w-full overflow-hidden rounded-3xl bg-neutral-200">
          <Image
            src={data.meetingImage}
            alt={data.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="h-[197.5px] w-full rounded-3xl bg-neutral-200" />
      )}

      {/* Title & Category & CreatedAt */}
      <div className="space-y-[6px] py-6">
        {/* Title */}
        <h2 className="typo-title-md-bold h-10">{data.name}</h2>

        <div className="flex items-center gap-[10px]">
          {/* Category */}
          <CategoryBadge category={data.category} />

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
