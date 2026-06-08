import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchVideos } from "../api/dailymotionApi";

export default function SearchPage() {
    const [query, setQuery] = useState("dogs");

    const {
        data: videos,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["videos", query],
        queryFn: () => searchVideos(query),
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Something went wrong.</p>;
    }

    return (
        <main>
            <h1>Search Page</h1>

            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search videos..."
            />

            <ul>
                {videos?.map((video) => (
                    <li key={video.id}>
                        {video.title}
                    </li>
                ))}
            </ul>
        </main>
    );
}