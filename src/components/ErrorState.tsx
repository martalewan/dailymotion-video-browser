interface ErrorStateProps {
    message?: string;
}

export default function ErrorState({
    message = "Something went wrong.",
}: ErrorStateProps) {
    return <p role="alert">{message}</p>;
}