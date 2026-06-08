interface ErrorStateProps {
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function ErrorState({
    message = "Something went wrong.",
    actionLabel,
    onAction,
}: ErrorStateProps) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-5 text-text-primary">
            <section
                role="alert"
                className="max-w-md rounded-2xl border border-border-soft bg-surface p-6 text-center"
            >
                <h1 className="text-xl font-semibold tracking-tight">
                    Something went wrong
                </h1>

                <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {message}
                </p>

                {actionLabel && onAction && (
                    <button
                        type="button"
                        onClick={onAction}
                        className="
                            mt-6
                            rounded-xl
                            border
                            border-border-soft
                            bg-background
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-text-primary
                            transition
                            hover:bg-surface
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-brand-purple
                            focus-visible:ring-offset-2
                        "
                    >
                        {actionLabel}
                    </button>
                )}
            </section>
        </main>
    );
}