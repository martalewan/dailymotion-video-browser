export default function RelatedVideoCardSkeleton() {
    return (
        <article aria-hidden="true" className="flex gap-3 rounded-xl p-2">
            <div className="h-20 w-36 shrink-0 animate-pulse rounded-lg bg-skeleton" />

            <div className="flex-1">
                <div className="h-4 w-full animate-pulse rounded bg-skeleton" />

                <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-skeleton" />

                <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-skeleton" />
            </div>
        </article>
    );
}