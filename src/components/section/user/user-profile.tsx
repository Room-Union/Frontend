import { PasswordEditModal, ProfileEditModal } from "@/components/ui";
import Image from "next/image";

const UserProfile = () => {
  return (
    <section className="relative h-82 w-full bg-[#FAFAFA]">
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5">
        <Image
          src="/images/ImagePlaceholder.png"
          alt="[프로필 이미지]"
          width={120}
          height={120}
          className="rounded-full bg-[#E0E0E0] object-cover text-center text-[#666666]"
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
