import type { Video } from "../types/video";

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({
    video,
}: VideoCardProps) {
    return (
        <article>
            <img
                src={video.thumbnail_360_url}
                alt={video.title}
                width={320}
            />

            <h2>{video.title}</h2>
        </article>
    );
}