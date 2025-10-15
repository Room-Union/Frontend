import { Gatherings, UserProfile } from "@/components/section";

const MyPage = () => {
  return (
    <div className="pc:pt-12 tb:pt-[30px] mo:pt-6 flex flex-col gap-6 bg-white">
      <UserProfile />
      <Gatherings title="내가 생성한 모임" />
      <Gatherings title="내가 가입한 모임" />
    </div>
  );
};

export default MyPage;
