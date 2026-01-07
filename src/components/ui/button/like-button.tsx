"use client";

import useGetUserInfo from "@/apis/user/query/use-get-user-info";
import { HeartFill, HeartLine } from "@/assets/icons";
import { AUTH_MODAL_MESSAGES } from "@/constants/modal-message";
import { useModalStore } from "@/store/modal-store";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  liked: boolean;
  onClick: () => void;
  size: string;
}

const LikeButton = ({ liked, onClick, size }: LikeButtonProps) => {
  const router = useRouter();
  const { alertModal } = useModalStore();
  const { data: user } = useGetUserInfo();
  const isSignedIn = !!user;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isSignedIn) {
      alertModal({
        ...AUTH_MODAL_MESSAGES.LOGIN_REQUIRED,
        onConfirm: () => {
          router.push("/sign-in");
        },
      });
      return;
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="flex cursor-pointer items-center justify-center"
      type="button"
      aria-label="like button"
    >
      {liked ? (
        <HeartFill
          className={cn(
            "fill-blue-500 stroke-none transition-colors duration-200 hover:fill-blue-300",
            size
          )}
        />
      ) : (
        <HeartLine
          className={cn(
            "fill-gray-neutral-300 stroke-none transition-colors duration-200 hover:fill-blue-300",
            size
          )}
        />
      )}
    </button>
  );
};

export default LikeButton;
