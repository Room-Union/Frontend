"use client";

import useGetGatheringMembers from "@/apis/gathering/query/use-get-gathering-members";
import MemberCard from "@/components/ui/card/member-card";
import { GetGatheringMembersResponse } from "@/types/gathering";

interface MembersProps {
  meetingId: number;
}
const Members = ({ meetingId }: MembersProps) => {
  const { data: members, isLoading } = useGetGatheringMembers(meetingId);
  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="pc:mx-0 tb:-mx-6 mo:-mx-5 scrollbar-hide overflow-x-auto">
      <ul className="flex w-fit flex-row gap-8">
        {members
          ?.slice(0, 6)
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
  );
};

export default Members;
