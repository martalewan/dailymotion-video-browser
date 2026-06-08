import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVideo } from "../api/dailymotionApi";
import LikeButton from "../components/LikeButton";
import useLikedVideo from "../hooks/useLikedVideos";

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
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Something went wrong.</p>;
    }

    if (!video) {
        return <p>Video not found.</p>;
    }

    return (
        <main>
            <iframe
                src={`https://www.dailymotion.com/embed/video/${video.id}`}
                title={video.title}
                width="100%"
                height="400"
                allow="autoplay; fullscreen"
            />

            <LikeButton isLiked={isLiked} onToggle={toggleLike} />

            <h1>{video.title}</h1>

            <p>{video.description}</p>
        </main>
    );
}