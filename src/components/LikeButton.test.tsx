import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LikeButton from "./LikeButton";

test("calls onToggle when the user clicks the like button", async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();

    render(<LikeButton isLiked={false} onToggle={handleToggle} />);

    await user.click(screen.getByRole("button", { name: /like video/i }));

    expect(handleToggle).toHaveBeenCalledTimes(1);
});