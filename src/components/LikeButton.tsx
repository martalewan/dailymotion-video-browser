import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
    isLiked: boolean;
    onToggle: () => void;
}

export default function LikeButton({
    isLiked,
    onToggle,
}: LikeButtonProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={isLiked ? "Unlike video" : "Like video"}
            aria-pressed={isLiked}
            className={`
                    flex
                    h-11
                    w-11
                    min-h-11
                    min-w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                    duration-200
                    focus-ring
                    ${isLiked
                    ? "gradient-brand text-text-primary"
                    : "border border-border bg-surface text-text-primary hover:bg-background"
                }
`}
        >
            {isLiked ? (
                <FaHeart size={16} />
            ) : (
                <FaRegHeart size={16} />
            )}
        </button>
    );
}