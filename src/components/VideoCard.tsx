import { Link } from "react-router-dom";

import type { Video } from "../types/video";
import { formatDuration } from "../utils/formatDuration";
import { formatDate } from "../utils/formatDate";

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
    return (
        <Link
            to={`/video/${video.id}`}
            className="
                group
                block
                rounded-2xl
                focus-ring
            "
        >
            <article
                className="
                    rounded-2xl
                    p-3
                    transition-all
                    duration-200
                    hover:card-gradient
                "
            >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-skeleton">
                    {video.thumbnail_360_url ? (
                        <img
                            src={video.thumbnail_360_url}
                            alt={video.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-text-secondary">
                            No thumbnail
                        </div>
                    )}

                    {video.duration ? (
                        <span
                            className="
                                absolute
                                bottom-2
                                right-2
                                rounded-md
                                bg-black/75
                                px-2
                                py-1
                                text-xs
                                font-medium
                                text-white
                            "
                        >
                            {formatDuration(video.duration)}
                        </span>
                    ) : null}
                </div>

                <div className="mt-3">
                    <h2
                        className="
                            line-clamp-2
                            text-sm
                            font-medium
                            leading-snug
                            text-text-primary
                        "
                    >
                        {video.title}
                    </h2>

                    <p
                        className="
                            mt-1
                            text-xs
                            text-text-secondary
                        "
                    >
                        {video.channel} · {formatDate(video.created_time)}
                    </p>
                </div>
            </article>
        </Link>
    );
}