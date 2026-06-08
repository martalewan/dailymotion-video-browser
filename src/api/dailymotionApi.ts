import type { Video, VideoDetails } from "../types/video";

const BASE_URL = "https://api.dailymotion.com";

export async function searchVideos(
    query: string,
): Promise<Video[]> {
    if (!query.trim()) {
        return [];
    }

    const response = await fetch(
        `${BASE_URL}/videos?search=${encodeURIComponent(
            query
        )}&fields=id,title,thumbnail_360_url,duration,created_time,channel&limit=12`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch videos");
    }

    const data = await response.json();

    return data.list;
}
export async function getVideo(
    id: string,
): Promise<VideoDetails> {
    const response = await fetch(
        `https://api.dailymotion.com/video/${id}?fields=id,title,description,thumbnail_720_url`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch video");
    }

    return response.json();
}