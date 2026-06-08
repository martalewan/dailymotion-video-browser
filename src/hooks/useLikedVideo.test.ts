import { beforeEach, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";

import useLikedVideo from "./useLikedVideo";

beforeEach(() => {
    localStorage.clear();
});

test("toggles and persists liked video state", () => {
    const { result } = renderHook(() => useLikedVideo("x123"));

    expect(result.current.isLiked).toBe(false);

    act(() => {
        result.current.toggleLike();
    });

    expect(result.current.isLiked).toBe(true);
    expect(localStorage.getItem("likedVideos")).toBe(JSON.stringify(["x123"]));

    act(() => {
        result.current.toggleLike();
    });

    expect(result.current.isLiked).toBe(false);
    expect(localStorage.getItem("likedVideos")).toBe(JSON.stringify([]));
});