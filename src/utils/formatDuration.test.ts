import { expect, test } from "vitest";

import { formatDuration } from "./formatDuration";

test("formats durations under one hour", () => {
    expect(formatDuration(125)).toBe("2:05");
});

test("formats durations over one hour", () => {
    expect(formatDuration(3665)).toBe("1:01:05");
});