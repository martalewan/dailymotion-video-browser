import { useInfiniteQuery } from "@tanstack/react-query";
import { searchVideos } from "../api/dailymotionApi";
import { QUERY_STALE_TIME } from "../config/query";

export function useVideoSearchQuery(query: string) {
    const trimmedQuery = query.trim();

    return useInfiniteQuery({
        queryKey: ["videos", trimmedQuery],
        queryFn: ({ pageParam }) => searchVideos(trimmedQuery, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.has_more ? lastPage.page + 1 : undefined,
        enabled: trimmedQuery.length > 0,
        staleTime: QUERY_STALE_TIME,
    });
}