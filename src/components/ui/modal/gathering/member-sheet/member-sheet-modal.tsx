import ModalWrapper from "@/components/ui/modal/modal-wrapper";
import Profile from "@/components/ui/profile/profile";
import { GetGatheringMembersResponse } from "@/types/gathering";
import { useState } from "react";

interface MemberSheetModalProps {
  trigger: React.ReactNode;
  members: GetGatheringMembersResponse[];
}
const MemberSheetModal = ({ trigger, members }: MemberSheetModalProps) => {
  const [open, setOpen] = useState(false);
  const memberCount = members?.length || 0;

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title={`멤버들 (${memberCount})`}
      description="해당 모임의 멤버 리스트 모달입니다."
      trigger={trigger}
    >
      <div className="scrollbar-hide flex max-h-[300px] flex-col gap-[14px] overflow-scroll pb-6.5">
        {members?.map((member: GetGatheringMembersResponse, index: number) => (
          <MemberSheetItem key={index} member={member} />
        ))}
      </div>
    </ModalWrapper>
  );
};

interface MemberSheetItemProps {
  member: GetGatheringMembersResponse;
}

const MemberSheetItem = ({ member }: MemberSheetItemProps) => {
  return (
    <div className="flex h-[54px] w-full items-center gap-4 truncate">
      <Profile
        gender={member.gender}
        profileImageUrl={member.profileImage ?? null}
        className="m-[5px] size-[44px]"
      />
      <p className="tb:typo-title-2xs-medium typo-body-md-medium">
        {member.nickname}
      </p>
    </div>
  );
};

export default MemberSheetModal;
