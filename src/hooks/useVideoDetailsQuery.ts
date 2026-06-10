import { useQuery } from "@tanstack/react-query";

import {
    getChannelVideos,
    getCreator,
    getVideo,
} from "../api/dailymotionApi";
import { QUERY_STALE_TIME } from "../config/query";
import type { Creator, Video, VideoDetails } from "../types/video";

export function useVideoDetailsQuery(id: string | undefined) {
    const videoQuery = useQuery<VideoDetails>({
        queryKey: ["video", id],
        queryFn: () => getVideo(id!),
        enabled: Boolean(id),
        staleTime: QUERY_STALE_TIME,
    });

    const video = videoQuery.data;

    const relatedVideosQuery = useQuery<Video[]>({
        queryKey: ["channel-videos", video?.channel],
        queryFn: () => getChannelVideos(video!.channel),
        enabled: Boolean(video?.channel),
        staleTime: QUERY_STALE_TIME,
    });

    const creatorQuery = useQuery<Creator>({
        queryKey: ["creator", video?.owner],
        queryFn: () => getCreator(video!.owner),
        enabled: Boolean(video?.owner),
        staleTime: QUERY_STALE_TIME,
    });

    return {
        video,
        relatedVideos: relatedVideosQuery.data ?? [],
        creator: creatorQuery.data,

        isLoadingVideo: videoQuery.isLoading,
        isLoadingRelatedVideos: relatedVideosQuery.isLoading,

        error: videoQuery.error,
        refetchVideo: videoQuery.refetch,
    };
}