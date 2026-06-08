export function formatDate(timestamp: number): string {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(timestamp * 1000));
}