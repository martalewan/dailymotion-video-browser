import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import useDebounce from "../hooks/useDebounce";
import { useVideoSearchQuery } from "../hooks/useVideoSearchQuery";

import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import PageHeader from "../components/PageHeader";
import VideoCard from "../components/VideoCard";
import VideoCardSkeleton from "../components/VideoCardSkeleton";

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialQuery = searchParams.get("q") ?? "";

    const [query, setQuery] = useState(initialQuery);

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
    } = useVideoSearchQuery(debouncedQuery);

    function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        const nextQuery = event.target.value;

        setQuery(nextQuery);

        if (nextQuery.trim()) {
            setSearchParams({ q: nextQuery });
        } else {
            setSearchParams({});
        }
    }

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
            <PageHeader>
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
                        maxLength={100}
                        onChange={handleQueryChange}
                        placeholder="Search videos..."
                        autoComplete="off"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
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
            </PageHeader>

            <section className="page-container py-8">
                <div className="mb-7">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Discover videos instantly
                    </h1>

                    {hasResults && (
                        <p
                            aria-live="polite"
                            className="mt-2 text-sm text-text-secondary"
                        >
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
                                        border-border
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
                                        focus-ring
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
                        <div className="max-w-xl">
                            <h2 className="text-xl font-semibold tracking-tight">
                                Find your next video
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-text-secondary">
                                Search by topic, creator, or title to start browsing.
                            </p>
                        </div>
                    </section>
                )}
            </section>
        </main>
    );
}