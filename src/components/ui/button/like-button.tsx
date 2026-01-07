import { HeartFill, HeartLine } from "@/assets/icons";

import { cn } from "@/utils/cn";

interface LikeButtonProps {
  liked: boolean;
  onClick: () => void;
  size: string;
}

const LikeButton = ({ liked, onClick, size }: LikeButtonProps) => {
  return (
    <button
      onClick={onClick}
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
