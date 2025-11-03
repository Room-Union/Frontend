import { EmptyProfile } from "@/assets/icons-colored";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import Image from "next/image";

interface ProfileProps {
  profileImageUrl: string | null;
  size?: "sm" | "md" | "lg" | "xs";
  className?: string;
}

const profileVariant = cva("", {
  variants: {
    size: {
      xs: "w-[30px] h-[30px]",
      sm: "w-[40px] h-[40px]",
      md: "w-[54px] h-[54px]",
      lg: "w-[114px] h-[114px]",
    },
  },
});

const Profile = ({ profileImageUrl, size, className }: ProfileProps) => {
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
        <EmptyProfile className={cn(profileVariant({ size }), className)} />
      )}
    </>
  );
};

export default Profile;
