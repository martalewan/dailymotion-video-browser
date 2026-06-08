import { Link } from "react-router-dom";
import type { Video } from "../types/video";

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({
    video,
}: VideoCardProps) {
    return (
        <Link to={`/video/${video.id}`}>
            <article>
                <img
                    src={video.thumbnail_360_url}
                    alt={video.title}
                    width={320}
                />

                <h2>{video.title}</h2>
            </article>
        </Link>
    );
}