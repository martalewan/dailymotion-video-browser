import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchVideos } from "../api/dailymotionApi";
import useDebounce from "../hooks/useDebounce";
import VideoCard from "../components/VideoCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function SearchPage() {
    const [query, setQuery] = useState("dogs");

    const debouncedQuery = useDebounce(query, 500);

    const {
        data: videos,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["videos", debouncedQuery],
        queryFn: () => searchVideos(debouncedQuery),
        enabled: debouncedQuery.trim().length > 0,
    });

    if (isLoading) {
        return <LoadingState message="Loading videos..." />;
    }

    if (error) {
        return (
            <ErrorState message="Something went wrong while loading videos." />
        );
    }

    return (
        <main>
            <h1>Dailymotion Video Browser</h1>

            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search videos..."
            />

            {!videos?.length ? (
                <EmptyState
                    message={`No videos found for "${debouncedQuery}".`}
                />
            ) : (
                <section>
                    {videos.map((video) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}