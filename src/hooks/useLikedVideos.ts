import { useEffect, useState } from "react";

const STORAGE_KEY = "likedVideos";

function getStoredLikedVideos(): string[] {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
        return [];
    }

    try {
        return JSON.parse(storedValue);
    } catch {
        return [];
    }
}

export default function useLikedVideo(videoId: string | undefined) {
    const [likedVideos, setLikedVideos] = useState<string[]>(() =>
        getStoredLikedVideos(),
    );

    const isLiked = videoId ? likedVideos.includes(videoId) : false;

    function toggleLike() {
        if (!videoId) {
            return;
        }

        setLikedVideos((currentLikedVideos) => {
            const isAlreadyLiked = currentLikedVideos.includes(videoId);

            if (isAlreadyLiked) {
                return currentLikedVideos.filter((id) => id !== videoId);
            }

            return [...currentLikedVideos, videoId];
        });
    }

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(likedVideos));
    }, [likedVideos]);

    return {
        isLiked,
        toggleLike,
    };
}