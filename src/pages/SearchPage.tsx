import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchVideos } from "../api/dailymotionApi";
import useDebounce from "../hooks/useDebounce";
import VideoCard from "../components/VideoCard";

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

    return (
        <main>
            <h1>Search Page</h1>

            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search videos..."
            />

            {isLoading && <p>Loading...</p>}

            {error && <p>Something went wrong.</p>}

            <section>
                {videos?.map((video) => (
                    <VideoCard
                        key={video.id}
                        video={video}
                    />
                ))}
            </section>
        </main>
    );
}