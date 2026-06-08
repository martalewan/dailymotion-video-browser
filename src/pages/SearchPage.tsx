import { useState } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";

import logo from "../assets/dailymotion-logo.svg";

import { searchVideos } from "../api/dailymotionApi";
import useDebounce from "../hooks/useDebounce";

import VideoCard from "../components/VideoCard";
import VideoCardSkeleton from "../components/VideoCardSkeleton";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);

    const {
        data,
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        error,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["videos", debouncedQuery],
        queryFn: ({ pageParam }) => searchVideos(debouncedQuery, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.has_more ? lastPage.page + 1 : undefined,
        enabled: debouncedQuery.trim().length > 0,
        staleTime: 1000 * 60 * 5,
    });

    if (error) {
        return (
            <ErrorState
                message="Something went wrong while loading videos."
                actionLabel="Try again"
                onAction={() => refetch()}
            />
        );
    }

    const videos = data?.pages.flatMap((page) => page.list) ?? [];
    const totalVideos = data?.pages[0]?.total;
    const hasSearch = debouncedQuery.trim().length > 0;
    const hasResults = videos.length > 0;

    return (
        <main className="min-h-screen bg-background text-text-primary">
            <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-4 px-5 py-4 sm:flex-row sm:items-center sm:gap-5">
                    <Link
                        to="/"
                        className="shrink-0"
                    >
                        <img
                            src={logo}
                            alt="Dailymotion"
                            className="h-8"
                        />
                    </Link>

                    <div className="relative w-full sm:flex-1">
                        <label
                            htmlFor="video-search"
                            className="sr-only"
                        >
                            Search videos
                        </label>

                        <FaSearch
                            aria-hidden="true"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-secondary"
                        />

                        <input
                            id="video-search"
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search videos..."
                            className="
                                w-full
                                rounded-xl
                                border
                                border-border-soft
                                bg-surface
                                py-3
                                pl-11
                                pr-4
                                text-sm
                                outline-none
                                transition-all
                                focus:border-brand-purple
                                focus:ring-2
                                focus:ring-brand-purple/20
                            "
                        />
                    </div>
                </div>
            </header>

            <section className="mx-auto max-w-[1600px] px-5 py-8">
                <div className="mb-7">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Discover videos instantly
                    </h1>

                    {hasResults && (
                        <p className="mt-2 text-sm text-text-secondary">
                            Showing {videos.length}
                            {totalVideos ? ` of ${totalVideos}` : ""} videos for{" "}
                            <span className="text-text-primary">
                                "{debouncedQuery}"
                            </span>

                            {isFetching && !isFetchingNextPage && (
                                <span className="ml-2">
                                    Updating...
                                </span>
                            )}
                        </p>
                    )}
                </div>

                {isLoading ? (
                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <VideoCardSkeleton key={index} />
                        ))}
                    </section>
                ) : hasSearch && !hasResults ? (
                    <EmptyState
                        message={`No videos found for "${debouncedQuery}".`}
                    />
                ) : hasResults ? (
                    <>
                        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {videos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                />
                            ))}
                        </section>

                        {hasNextPage && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    aria-busy={isFetchingNextPage}
                                    className="
                                        rounded-xl
                                        border
                                        border-border-soft
                                        bg-surface
                                        px-5
                                        py-3
                                        text-sm
                                        font-medium
                                        text-text-primary
                                        transition
                                        hover:bg-background
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                        focus-visible:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-brand-purple
                                        focus-visible:ring-offset-2
                                    "
                                >
                                    {isFetchingNextPage
                                        ? "Loading..."
                                        : "Load more"}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <section className="pt-2">
                        <h2 className="text-xl font-semibold tracking-tight">
                            Find your next video
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-text-secondary">
                            Search by topic, creator, or title to start browsing.
                        </p>
                    </section>
                )}
            </section>
        </main>
    );
}