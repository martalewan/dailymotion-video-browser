import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
    isLiked: boolean;
    onToggle: () => void;
}

export default function LikeButton({ isLiked, onToggle }: LikeButtonProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={isLiked}
            aria-label={isLiked ? "Unlike video" : "Like video"}
        >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            {isLiked ? " Unlike" : " Like"}
        </button>
    );
}