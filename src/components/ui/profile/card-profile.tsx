import { cva } from "class-variance-authority";
import Image from "next/image";

const profileVariants = cva("relative overflow-hidden rounded-xl", {
  variants: {
    size: {
      sm: "size-[68px]",
      lg: "size-[88px]",
    },
  },
});

interface CardProfileProps {
  size: "sm" | "lg";
  profileImageUrl?: string;
}

const CardProfile = ({ size, profileImageUrl }: CardProfileProps) => {
  return (
    <div className={profileVariants({ size })}>
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
