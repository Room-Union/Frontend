import ModalWrapper from "@/components/ui/modal/modal-wrapper";
import Profile from "@/components/ui/profile/profile";
import { GenderType } from "@/types/constants";
import { useState } from "react";

const MemberSheetModal = () => {
  const [open, setOpen] = useState(false);
  const memberCount = 5; // Todo: member.length로 변경 예정

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title={`멤버들 (${memberCount})`}
      description="해당 모임의 멤버 리스트 모달입니다."
    >
      <div className="scrollbar-hide flex max-h-[300px] flex-col gap-[14px] overflow-scroll pb-6.5">
        {/* Todo: member.map으로 변경 예정 */}

        <MemberSheetItem gender="MALE" nickname="John Doe 1" />
        <MemberSheetItem gender="FEMALE" nickname="Jane Doe 2" />
        <MemberSheetItem gender="MALE" nickname="John Doe 3" />
        <MemberSheetItem gender="FEMALE" nickname="Jane Doe 4" />
        <MemberSheetItem gender="MALE" nickname="John Doe 5" />
      </div>
    </ModalWrapper>
  );
};

interface MemberSheetItemProps {
  gender: GenderType;
  profileImageUrl?: string;
  nickname: string;
}

const MemberSheetItem = ({
  gender,
  profileImageUrl,
  nickname,
}: MemberSheetItemProps) => {
  return (
    <div className="flex h-[54px] items-center gap-4">
      <Profile
        gender={gender}
        profileImageUrl={profileImageUrl ?? null}
        className="m-[5px] size-[44px]"
      />
      <p>{nickname}</p>
    </div>
  );
};

export default MemberSheetModal;
