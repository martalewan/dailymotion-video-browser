import { useState } from "react";

interface VideoDescriptionProps {
    description: string;
}

export default function VideoDescription({ description }: VideoDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const shouldShowDescriptionToggle = description.length > 250;

    if (!description) {
        return null;
    }

    return (
        <section className="mt-8">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-secondary">
                Description
            </h2>

            <p
                className={`
                    whitespace-pre-wrap
                    text-sm
                    leading-7
                    text-text-secondary
                    ${isExpanded ? "" : "line-clamp-6"}
                `}
            >
                {description}
            </p>

            {shouldShowDescriptionToggle && (
                <button
                    type="button"
                    onClick={() => setIsExpanded((current) => !current)}
                    className="
                        mt-3
                        rounded-md
                        text-sm
                        font-medium
                        text-brand-purple-dark
                        focus-ring
                    "
                >
                    {isExpanded ? "Show less" : "Show more"}
                </button>
            )}
        </section>
    );
}