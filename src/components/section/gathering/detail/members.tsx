"use client";

import useGetGatheringMembers from "@/apis/gathering/query/use-get-gathering-members";
import { DetailSection } from "@/components/section";
import Button from "@/components/ui/button/button";
import MemberCard from "@/components/ui/card/member-card";
import MemberSheetModal from "@/components/ui/modal/gathering/member-sheet/member-sheet-modal";
import { GetGatheringMembersResponse } from "@/types/gathering";

interface MembersProps {
  meetingId: number;
}

const Members = ({ meetingId }: MembersProps) => {
  const { data: members } = useGetGatheringMembers(meetingId);
  const shouldShowMoreButton = members && members.length >= 3;

  return (
    <DetailSection
      title="멤버들"
      action={
        shouldShowMoreButton ? (
          <MemberSheetModal
            trigger={
              <Button variant="underline" size="text">
                더보기
              </Button>
            }
            members={members}
          />
        ) : undefined
      }
    >
      <section className="pc:mx-0 tb:-mx-6 mo:-mx-5 scrollbar-hide overflow-x-auto">
        <ul className="flex w-fit flex-row gap-8">
          {members
            .slice(0, 6)
            .map((member: GetGatheringMembersResponse, index: number) => (
              <li
                key={`member-${index}`}
                className="pc:first:ml-0 tb:first:ml-6 mo:first:ml-5 pc:last:mr-0 tb:last:mr-6 mo:last:mr-5"
              >
                <MemberCard member={member} />
              </li>
            ))}
        </ul>
      </section>
    </DetailSection>
  );
};

export default Members;
