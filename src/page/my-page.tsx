import { Gatherings, UserProfile } from "@/components/section";

const MyPage = () => {
  return (
    <div className="flex flex-col gap-6 bg-white">
      <UserProfile />
      <Gatherings title="내가 생성한 모임" />
      <Gatherings title="내가 가입한 모임" />
    </div>
  );
};

export default MyPage;
