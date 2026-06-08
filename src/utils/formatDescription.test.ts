import { expect, test } from "vitest";

import { formatDescription } from "./formatDescription";

test("converts HTML line breaks to new lines", () => {
    expect(formatDescription("First line<br>Second line")).toBe(
        "First line\nSecond line",
    );
});