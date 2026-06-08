import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import VideoCard from "./VideoCard";

test("renders video title, thumbnail and link", () => {
    render(
        <MemoryRouter>
            <VideoCard
                video={{
                    id: "x123",
                    title: "Test video",
                    thumbnail_360_url: "https://example.com/thumb.jpg",
                }}
            />
        </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /test video/i })).toBeInTheDocument();

    expect(screen.getByRole("img", { name: /test video/i })).toHaveAttribute(
        "src",
        "https://example.com/thumb.jpg",
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/video/x123");
});