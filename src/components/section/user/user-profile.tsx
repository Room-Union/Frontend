import { PasswordEditModal, Profile, ProfileEditModal } from "@/components/ui";

const UserProfile = () => {
  return (
    <section className="relative h-82 w-full bg-[#FAFAFA]">
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5">
        <Profile
          gender="MALE"
          profileImageUrl={null}
          size="md"
          className="mo:w-[114px] mo:h-[114px]"
        />
        <span className="text-2xl font-bold text-black">영화러버</span>
        <span className="text-[16px] font-normal text-[#666666]">
          yoon@example.com
        </span>
        <div className="flex gap-3">
          <ProfileEditModal />
          <PasswordEditModal />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
