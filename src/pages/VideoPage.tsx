import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getChannelVideos, getCreator, getVideo } from "../api/dailymotionApi";

import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import LikeButton from "../components/LikeButton";
import RelatedVideoCard from "../components/RelatedVideoCard";
import RelatedVideoCardSkeleton from "../components/RelatedVideoCardSkeleton";
import VideoPlayerSkeleton from "../components/VideoPlayerSkeleton";

import useLikedVideo from "../hooks/useLikedVideo";

import { formatDate } from "../utils/formatDate";
import { formatDescription } from "../utils/formatDescription";
import { formatDuration } from "../utils/formatDuration";

export default function VideoPage() {
    const { id } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);

    const { isLiked, toggleLike } = useLikedVideo(id);

    const {
        data: video,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["video", id],
        queryFn: () => getVideo(id!),
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 5,
    });

    const { data: nextVideos, isLoading: isLoadingRelatedVideos } = useQuery({
        queryKey: ["channel-videos", video?.channel],
        queryFn: () => getChannelVideos(video!.channel),
        enabled: Boolean(video?.channel),
        staleTime: 1000 * 60 * 5,
    });

    const { data: creator } = useQuery({
        queryKey: ["creator", video?.owner],
        queryFn: () => getCreator(video!.owner),
        enabled: Boolean(video?.owner),
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        setIsExpanded(false);
    }, [id]);

    if (error) {
        return (
            <ErrorState message="Something went wrong while loading this video." />
        );
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background text-text-primary">
                <section className="mx-auto max-w-[1600px] px-5 py-8">
                    <Link
                        to="/"
                        className="mb-6 inline-flex text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                    >
                        ← Back to search
                    </Link>

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
                        <div>
                            <VideoPlayerSkeleton />

                            <div className="mt-6 space-y-4">
                                <div className="h-8 w-3/4 animate-pulse rounded bg-skeleton" />

                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 animate-pulse rounded-full bg-skeleton" />

                                    <div className="space-y-2">
                                        <div className="h-4 w-36 animate-pulse rounded bg-skeleton" />
                                        <div className="h-3 w-56 animate-pulse rounded bg-skeleton" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <aside className="h-fit lg:sticky lg:top-24">
                            <h2 className="mb-4 text-lg font-semibold tracking-tight">
                                Related videos
                            </h2>

                            <div className="grid gap-4">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <RelatedVideoCardSkeleton key={index} />
                                ))}
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
        );
    }

    if (!video) {
        return <EmptyState message="Video not found." />;
    }

    const description = formatDescription(video.description);

    const relatedVideos =
        nextVideos?.filter((nextVideo) => nextVideo.id !== video.id) ?? [];

    const shouldShowDescriptionToggle = description.length > 250;

    const creatorInitial = creator?.screenname?.charAt(0).toUpperCase();

    return (
        <main className="min-h-screen bg-background text-text-primary">
            <section className="mx-auto max-w-[1600px] px-5 py-8">
                <Link
                    to="/"
                    className="mb-6 inline-flex text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                    ← Back to search
                </Link>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
                    <div>
                        <div className="overflow-hidden rounded-2xl bg-black">
                            <iframe
                                src={`https://www.dailymotion.com/embed/video/${video.id}`}
                                title={video.title}
                                className="aspect-video w-full"
                                allow="fullscreen; web-share"
                            />
                        </div>

                        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                    {video.title}
                                </h1>

                                {creator ? (
                                    <div className="mt-4 flex items-center gap-3">
                                        {creator.avatar_360_url ? (
                                            <img
                                                src={creator.avatar_360_url}
                                                alt={creator.screenname}
                                                loading="lazy"
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-skeleton text-sm font-semibold text-text-secondary">
                                                {creatorInitial}
                                            </div>
                                        )}

                                        <div>
                                            <p className="text-sm font-medium text-text-primary">
                                                {creator.screenname}
                                            </p>

                                            <p className="text-sm text-text-secondary">
                                                {video.channel} ·{" "}
                                                {formatDate(video.created_time)} ·{" "}
                                                {formatDuration(video.duration)}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="mt-2 text-sm text-text-secondary">
                                        {video.channel} ·{" "}
                                        {formatDate(video.created_time)} ·{" "}
                                        {formatDuration(video.duration)}
                                    </p>
                                )}
                            </div>

                            <LikeButton
                                isLiked={isLiked}
                                onToggle={toggleLike}
                            />
                        </div>

                        {description && (
                            <section className="mt-8">
                                <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-secondary">
                                    Description
                                </h2>

                                <p
                                    className={`
                                        whitespace-pre-wrap
                                        text-sm
                                        leading-7
                                        text-text-secondary
                                        ${isExpanded ? "" : "line-clamp-6"}
                                    `}
                                >
                                    {description}
                                </p>

                                {shouldShowDescriptionToggle && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsExpanded((current) => !current)
                                        }
                                        className="mt-3 text-sm font-medium text-brand-purple-dark"
                                    >
                                        {isExpanded ? "Show less" : "Show more"}
                                    </button>
                                )}
                            </section>
                        )}
                    </div>

                    <aside className="h-fit lg:sticky lg:top-24">
                        <h2 className="mb-4 text-lg font-semibold tracking-tight">
                            Related videos
                        </h2>

                        {isLoadingRelatedVideos ? (
                            <div className="grid gap-4">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <RelatedVideoCardSkeleton key={index} />
                                ))}
                            </div>
                        ) : relatedVideos.length > 0 ? (
                            <div className="grid gap-4">
                                {relatedVideos.map((nextVideo) => (
                                    <RelatedVideoCard
                                        key={nextVideo.id}
                                        video={nextVideo}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-text-secondary">
                                No related videos found.
                            </p>
                        )}
                    </aside>
                </div>
            </section>
        </main>
    );
}