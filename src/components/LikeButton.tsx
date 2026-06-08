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
            className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                transition-all
                duration-200
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-brand-purple
                focus-visible:ring-offset-2
                ${isLiked
                    ? "gradient-brand text-text-primary"
                    : "border border-border-soft bg-surface text-text-primary hover:bg-background"
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