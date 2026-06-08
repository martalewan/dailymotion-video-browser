import { useQuery } from "@tanstack/react-query";
import { searchVideos } from "../api/dailymotionApi";

export default function SearchPage() {
    const {
        data: videos,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["videos"],
        queryFn: () => searchVideos("dogs"),
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