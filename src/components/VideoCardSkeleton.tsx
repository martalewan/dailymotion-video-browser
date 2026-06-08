export default function VideoCardSkeleton() {
    return (
        <article
            aria-hidden="true"
            className="rounded-2xl p-3"
        >
            <div className="aspect-video animate-pulse rounded-xl bg-skeleton" />

            <div className="mt-3 space-y-2">
                <div className="h-4 w-4/5 animate-pulse rounded bg-skeleton" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-skeleton" />
            </div>
        </article>
    );
}
