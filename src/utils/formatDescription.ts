export function formatDescription(description: string): string {
    return description.replace(/<br\s*\/?>/gi, "\n");
}