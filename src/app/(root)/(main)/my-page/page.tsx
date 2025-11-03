import { AuthGuard, Gatherings, UserProfile } from "@/components/section";

const MyPage = () => {
  return (
    <AuthGuard>
      <div className="pc:pt-[50px] tb:pt-9 mo:pt-6 pc:gap-[74px] tb:gap-[50px] mo:gap-10 pc:pb-[107px] tb:pb-[160px] mo:pb-[93px] flex flex-col bg-white">
        <UserProfile />
        <Gatherings />
      </div>
    </AuthGuard>
  );
};

export default MyPage;
