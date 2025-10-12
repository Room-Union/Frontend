import { Users } from "@/assets/icons-colored";
import { GetGatheringDetailResponse } from "@/types/gathering";

interface InformationProps {
  data: GetGatheringDetailResponse;
}

const Information = ({ data }: InformationProps) => {
  return (
    <div className="flex flex-col justify-between">
      <InformationItem title="가입 조건">누구나 가입 가능</InformationItem>
      <InformationItem title="모임 인원">
        <Users className="mr-[6px] size-[18px]" />
        <span>
          {data.currentMemberCount}/{data.maxMemberCount}명
        </span>
      </InformationItem>
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
      <span className="typo-body-md-semibold text-neutral-500">{title}</span>
      <div className="typo-ui-md-medium flex">{children}</div>
    </div>
  );
};

export default Information;
