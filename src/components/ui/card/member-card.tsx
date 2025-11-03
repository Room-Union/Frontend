import { Crown } from "@/assets/icons-colored";
import { Profile } from "@/components/ui";
import { GetGatheringMembersResponse } from "@/types/gathering";

interface MemberCardProps {
  member: GetGatheringMembersResponse;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <div className="tb:h-[42px] tb:max-w-[132px] flex h-[32px] max-w-[111px] items-center gap-2">
      <Profile
        profileImageUrl={member.profileImage ?? null}
        className="tb:size-[40px] size-[30px] flex-shrink-0"
      />
      <div className="flex items-center gap-1 overflow-hidden">
        <p className="typo-ui-sm-semibold tb:typo-ui-md-semibold truncate">
          {member.nickname}
        </p>
        {member.owner && (
          <Crown className="tb:size-[18px] size-[14px] flex-shrink-0" />
        )}
      </div>
    </div>
  );
};

export default MemberCard;
