import { Crown } from "@/assets/icons-colored";
import { Profile } from "@/components/ui";
import { type GenderType } from "@/types/constants";
import { cva } from "class-variance-authority";

interface MemberCardProps {
  size?: "sm" | "lg";
  isLeader?: boolean;
  nickname: string;
  profileImageUrl?: string;
  gender: GenderType;
}

const PROFILE_SIZE_MAP = {
  sm: "xs",
  lg: "sm",
} as const;

const cardVariants = cva("flex items-center gap-2", {
  variants: {
    size: {
      sm: "h-[32px]",
      lg: "h-[42px]",
    },
  },
});

const nicknameVariants = cva("", {
  variants: {
    size: {
      sm: "typo-ui-sm-semibold",
      lg: "typo-ui-md-semibold",
    },
  },
});

const crownVariants = cva("", {
  variants: {
    size: {
      sm: "size-[14px]",
      lg: "size-[18px]",
    },
  },
});

const MemberCard = ({
  size = "lg",
  isLeader = false,
  nickname,
  profileImageUrl,
  gender,
}: MemberCardProps) => {
  const profileSize = size ? PROFILE_SIZE_MAP[size] : "sm";

  return (
    <div className={cardVariants({ size })}>
      <Profile
        size={profileSize}
        gender={gender}
        profileImageUrl={profileImageUrl ?? null}
      />
      <div className="flex items-center gap-1">
        <p className={nicknameVariants({ size })}>{nickname}</p>
        {isLeader && <Crown className={crownVariants({ size })} />}
      </div>
    </div>
  );
};

export default MemberCard;
