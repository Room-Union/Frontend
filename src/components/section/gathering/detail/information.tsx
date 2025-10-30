import { Users } from "@/assets/icons-colored";
import { UrlListModal } from "@/components/ui";
import type { GetGatheringDetailResponse } from "@/types/gathering";
import { cn } from "@/utils/cn";

interface InformationProps {
  data: GetGatheringDetailResponse;
  className?: string;
}

const Information = ({ data, className }: InformationProps) => {
  return (
    <div className={cn("pc:flex flex-col justify-between", className)}>
      <InformationItem title="가입 조건">누구나 가입 가능</InformationItem>
      <InformationItem title="모임 인원">
        <Users className="mr-[6px] size-[18px]" />
        <span>
          {data.currentMemberCount}/{data.maxMemberCount}명
        </span>
      </InformationItem>

      {/* 모임 URL: 참여한 모임원에게만 보여줌 */}
      {data.joined && (
        <InformationItem title="모임 URL">
          <UrlListModal platformURL={data.platformURL} />
        </InformationItem>
      )}
    </div>
  );
};

const InformationItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-[38px] items-center justify-between">
      <span className="tb:typo-body-md-semibold typo-body-sm-semibold text-neutral-500">
        {title}
      </span>
      <div className="tb:typo-ui-md-medium typo-ui-sm-medium flex">
        {children}
      </div>
    </div>
  );
};

export default Information;
