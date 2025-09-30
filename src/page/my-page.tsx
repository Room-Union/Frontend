import { Gatherings, UserProfile } from "@/components/section";

const MyPage = () => {
  return (
    <main className="flex min-h-screen w-screen flex-col gap-6 bg-white px-90">
      <UserProfile />
      <Gatherings title="내가 생성한 모임" />
      <Gatherings title="내가 가입한 모임" />
    </main>
  );
};

export default MyPage;
