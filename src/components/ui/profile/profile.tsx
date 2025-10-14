import SvgProfileF1 from "@/assets/icons-colored/profile-f1";
import SvgProfileF2 from "@/assets/icons-colored/profile-f2";
import SvgProfileM1 from "@/assets/icons-colored/profile-m1";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import Image from "next/image";

interface ProfileProps {
  gender: "MALE" | "FEMALE" | "NONE";
  profileImageUrl: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const PROFILE_ICONS = {
  MALE: SvgProfileM1,
  FEMALE: SvgProfileF1,
  NONE: SvgProfileF2,
} as const;

const profileVariant = cva("", {
  variants: {
    size: {
      sm: "w-[40px] h-[40px]",
      md: "w-[54px] h-[54px]",
      lg: "w-[114px] h-[114px]",
    },
  },
});

const Profile = ({
  gender,
  profileImageUrl,
  size,
  className,
}: ProfileProps) => {
  const IconComponent = PROFILE_ICONS[gender];

  return (
    <>
      {profileImageUrl ? (
        <div className={cn(profileVariant({ size }), "relative", className)}>
          <Image
            src={profileImageUrl}
            alt="profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
      ) : (
        <IconComponent className={cn(profileVariant({ size }), className)} />
      )}
    </>
  );
};

export default Profile;
