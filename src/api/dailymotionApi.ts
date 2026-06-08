import type {
    Creator,
    DailymotionListResponse,
    Video,
    VideoDetails,
} from "../types/video";

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

export function buildApiUrl(
    path: string,
    params: Record<string, string | number>,
): string {
    const url = new URL(path, BASE_URL);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
    });

    return url.toString();
}

export async function searchVideos(
    query: string,
    page = 1,
): Promise<DailymotionListResponse<Video>> {
    if (!query.trim()) {
        return {
            page,
            limit: 12,
            explicit: false,
            total: 0,
            has_more: false,
            list: [],
        };
    }

    const response = await fetch(
        buildApiUrl("/videos", {
            search: query,
            fields: VIDEO_LIST_FIELDS,
            limit: 12,
            page,
        }),
    );

    if (!response.ok) {
        throw new Error("Failed to fetch videos");
    }

    return response.json();
}

export async function getVideo(id: string): Promise<VideoDetails> {
    const response = await fetch(
        buildApiUrl(`/video/${id}`, {
            fields: VIDEO_DETAILS_FIELDS,
        }),
    );

    if (!response.ok) {
        throw new Error("Failed to fetch video");
    }

    return response.json();
}

export async function getChannelVideos(channel: string): Promise<Video[]> {
    const response = await fetch(
        buildApiUrl("/videos", {
            channel,
            fields: VIDEO_LIST_FIELDS,
            limit: 6,
        }),
    );

    if (!response.ok) {
        throw new Error("Failed to fetch channel videos");
    }

    const data: DailymotionListResponse<Video> = await response.json();

    return data.list;
}

export async function getCreator(id: string): Promise<Creator> {
    const response = await fetch(
        buildApiUrl(`/user/${id}`, {
            fields: "id,screenname,avatar_360_url",
        }),
    );

    if (!response.ok) {
        throw new Error("Failed to fetch creator");
    }

    return response.json();
}