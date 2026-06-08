import type { Video } from "../types/video";

const BASE_URL = "https://api.dailymotion.com";

export async function searchVideos(
    query: string,
): Promise<Video[]> {
    const response = await fetch(
        `${BASE_URL}/videos?search=${encodeURIComponent(query)}&fields=id,title,thumbnail_360_url&limit=12`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch videos");
    }

    const data = await response.json();

    return data.list;
}