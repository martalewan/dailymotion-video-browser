interface EmptyStateProps {
    message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
    return (
        <section className="flex min-h-60 items-center justify-center rounded-2xl border border-border-soft bg-surface px-5 text-center">
            <p className="max-w-md text-sm leading-6 text-text-secondary">
                {message}
            </p>
        </section>
    );
}