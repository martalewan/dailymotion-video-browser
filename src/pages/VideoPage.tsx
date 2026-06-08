import { useParams } from "react-router-dom";

export default function VideoPage() {
    const { id } = useParams();

    return (
        <main>
            <h1>Video Page</h1>
            <p>Video ID: {id}</p>
        </main>
    );
}