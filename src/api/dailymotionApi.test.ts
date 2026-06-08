
import { expect, test } from "vitest";

import { buildApiUrl } from "./dailymotionApi";

test("builds encoded Dailymotion API urls", () => {
    const url = buildApiUrl("/videos", {
        search: "react hooks",
        fields: "id,title",
        limit: 12,
    });

    expect(url).toBe(
        "https://api.dailymotion.com/videos?search=react+hooks&fields=id%2Ctitle&limit=12",
    );
});