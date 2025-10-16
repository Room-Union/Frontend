import { Crown } from "@/assets/icons-colored";
import { Profile } from "@/components/ui";
import { type GenderType } from "@/types/constants";

interface MemberCardProps {
  isLeader?: boolean;
  nickname: string;
  profileImageUrl?: string;
  gender: GenderType;
}

const MemberCard = ({
  isLeader = false,
  nickname,
  profileImageUrl,
  gender,
}: MemberCardProps) => {
  return (
    <div className="tb:h-[42px] flex h-[32px] items-center gap-2">
      <Profile
        gender={gender}
        profileImageUrl={profileImageUrl ?? null}
        className="tb:size-[40px] size-[30px]"
      />
      <div className="flex items-center gap-1">
        <p className="typo-ui-sm-semibold tb:typo-ui-md-semibold">{nickname}</p>
        {isLeader && <Crown className="tb:size-[18px] size-[14px]" />}
      </div>
    </div>
  );
};

export default MemberCard;
