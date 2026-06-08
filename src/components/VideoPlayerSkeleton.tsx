export default function VideoPlayerSkeleton() {
    return (
        <div
            aria-hidden="true"
            className="relative aspect-video overflow-hidden rounded-2xl bg-skeleton">
            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-10
                    w-10
                    -translate-x-1/2
                    -translate-y-1/2
                    animate-spin
                    rounded-full
                    border-2
                    border-brand-purple
                    border-t-transparent
                "
            />
        </div>
    );
}