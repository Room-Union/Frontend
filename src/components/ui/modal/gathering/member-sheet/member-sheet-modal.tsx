import ModalWrapper from "@/components/ui/modal/modal-wrapper";
import Profile from "@/components/ui/profile/profile";
import { GenderType } from "@/types/constants";
import { useState } from "react";

const MemberSheetModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="멤버들"
      description="해당 모임의 멤버 리스트 모달입니다."
    >
      <div className="flex flex-col gap-[14px]">
        <MemberSheetItem gender="MALE" nickname="John Doe" />
        <MemberSheetItem gender="FEMALE" nickname="Jane Doe" />
        <MemberSheetItem gender="MALE" nickname="John Doe" />
        <MemberSheetItem gender="FEMALE" nickname="Jane Doe" />
        <MemberSheetItem gender="MALE" nickname="John Doe" />
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
        className="size-[44px] p-[5px]"
      />
      <p>{nickname}</p>
    </div>
  );
};

export default MemberSheetModal;
