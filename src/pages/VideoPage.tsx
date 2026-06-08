import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getVideo } from "../api/dailymotionApi";

export default function VideoPage() {
    const { id } = useParams();

    const {
        data: video,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["video", id],
        queryFn: () => getVideo(id!),
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Something went wrong.</p>;
    }

    if (!video) {
        return <p>Video not found.</p>;
    }

    return (
        <main>
            <img
                src={video.thumbnail_720_url}
                alt={video.title}
                width={600}
            />

            <h1>{video.title}</h1>

            <p>{video.description}</p>
        </main>
    );
}