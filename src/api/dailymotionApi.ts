import type { Creator, Video, VideoDetails } from "../types/video";

const BASE_URL = "https://api.dailymotion.com";

const VIDEO_LIST_FIELDS = [
    "id",
    "title",
    "thumbnail_360_url",
    "duration",
    "created_time",
    "channel",
].join(",");

const VIDEO_DETAILS_FIELDS = [
    "id",
    "title",
    "description",
    "thumbnail_720_url",
    "duration",
    "created_time",
    "channel",
    "owner",
].join(",");

export async function searchVideos(query: string): Promise<Video[]> {
    if (!query.trim()) {
        return [];
    }

    const response = await fetch(
        `${BASE_URL}/videos?search=${encodeURIComponent(query)}&fields=${VIDEO_LIST_FIELDS}&limit=12`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch videos");
    }

    const data = await response.json();

    return data.list;
}

export async function getVideo(id: string): Promise<VideoDetails> {
    const response = await fetch(
        `${BASE_URL}/video/${id}?fields=${VIDEO_DETAILS_FIELDS}`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch video");
    }

    return response.json();
}

export async function getChannelVideos(channel: string): Promise<Video[]> {
    const response = await fetch(
        `${BASE_URL}/videos?channel=${encodeURIComponent(channel)}&fields=${VIDEO_LIST_FIELDS}&limit=6`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch channel videos");
    }

    const data = await response.json();

    return data.list;
}

export async function getCreator(
    id: string,
): Promise<Creator> {
    const response = await fetch(
        `${BASE_URL}/user/${id}?fields=id,screenname,avatar_360_url`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch creator");
    }

    return response.json();
}