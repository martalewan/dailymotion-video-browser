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
        return (
            <ErrorState message="Something went wrong while loading this video." />
        );
    }

    if (!video) {
        return <EmptyState message="Video not found." />;
    }

    return (
        <main className="min-h-screen bg-background text-text-primary">
            <section className="mx-auto max-w-5xl px-5 py-8">
                <Link
                    to="/"
                    className="mb-6 inline-flex text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                    ← Back to search
                </Link>

                <div className="overflow-hidden rounded-2xl bg-black">
                    <iframe
                        src={`https://www.dailymotion.com/embed/video/${video.id}`}
                        title={video.title}
                        className="aspect-video w-full"
                        allow="fullscreen; picture-in-picture; web-share"
                    />
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            {video.title}
                        </h1>
                    </div>

                    <LikeButton
                        isLiked={isLiked}
                        onToggle={toggleLike}
                    />
                </div>

                {video.description && (
                    <div className="mt-6 rounded-2xl bg-surface p-5">
                        <h2 className="mb-2 text-sm font-medium text-text-primary">
                            Description
                        </h2>

                        <p className="text-sm leading-6 text-text-secondary">
                            {video.description}
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}