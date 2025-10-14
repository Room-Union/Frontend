import MemberCard from "@/components/ui/card/member-card";

const Members = () => {
  return (
    <>
      {/* Todo: 멤버가 3명 이상일 때부터 더보기 버튼 추가 -> 더보기 누르면 모달 등장 */}
      <div className="flex h-[42px] items-center">
        <MemberCard size="sm" nickname="test" gender="MALE" isLeader />
        <MemberCard size="lg" nickname="test2" gender="FEMALE" isLeader />
      </div>
    </>
  );
};

export default Members;
