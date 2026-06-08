import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVideo } from "../api/dailymotionApi";
import LikeButton from "../components/LikeButton";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import useLikedVideo from "../hooks/useLikedVideo";

export default function VideoPage() {
    const { id } = useParams();

    const { isLiked, toggleLike } = useLikedVideo(id);

    const {
        data: video,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["video", id],
        queryFn: () => getVideo(id!),
        enabled: Boolean(id),
    });

    if (isLoading) {
        return <LoadingState message="Loading video..." />;
    }

    if (error) {
        return <ErrorState message="Something went wrong while loading this video." />;
    }

    if (!video) {
        return <EmptyState message="Video not found." />;
    }

    return (
        <main>
            <Link to="/">← Back to search</Link>

            <iframe
                src={`https://www.dailymotion.com/embed/video/${video.id}`}
                title={video.title}
                width="100%"
                height="400"
                allow="autoplay; fullscreen"
            />

            <h1>{video.title}</h1>

            <LikeButton isLiked={isLiked} onToggle={toggleLike} />

            <p>{video.description}</p>
        </main>
    );
}