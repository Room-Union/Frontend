import Image from "next/image";

interface CardProfileProps {
  profileImageUrl?: string;
}

const CardProfile = ({ profileImageUrl }: CardProfileProps) => {
  return (
    <div className="tb:size-[88px] relative size-[68px] overflow-hidden rounded-xl">
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          alt="profile"
          className="object-cover"
          fill
        />
      ) : (
        <div className="bg-gray-neutral-300 size-full" />
      )}
    </div>
  );
};

export default CardProfile;
