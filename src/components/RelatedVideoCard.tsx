import { Link } from "react-router-dom";

import type { Video } from "../types/video";
import { formatDate } from "../utils/formatDate";
import { formatDuration } from "../utils/formatDuration";

interface RelatedVideoCardProps {
    video: Video;
}

export default function RelatedVideoCard({
    video,
}: RelatedVideoCardProps) {
    return (
        <Link
            to={`/video/${video.id}`}
            className="
                block
                rounded-xl
                focus-ring
            "
        >
            <article className="flex gap-3 rounded-xl p-2 hover:bg-surface">
                <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-lg bg-skeleton">
                    {video.thumbnail_360_url ? (
                        <img
                            src={video.thumbnail_360_url}
                            alt={video.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-text-secondary">
                            No thumbnail
                        </div>
                    )}

                    {video.duration ? (
                        <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1.5 py-0.5 text-[10px] text-white">
                            {formatDuration(video.duration)}
                        </span>
                    ) : null}
                </div>

                <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-medium">
                        {video.title}
                    </h3>

                    <p className="mt-1 text-xs text-text-secondary">
                        {video.channel}
                    </p>

                    <p className="text-xs text-text-secondary">
                        {formatDate(video.created_time)}
                    </p>
                </div>
            </article>
        </Link>
    );
}