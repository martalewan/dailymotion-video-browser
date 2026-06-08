export interface Video {
    id: string;
    title: string;
    thumbnail_360_url: string;
    duration: number;
    created_time: number;
    channel: string;
}

export interface VideoDetails {
    id: string;
    title: string;
    description: string;
    thumbnail_720_url: string;
    duration: number;
    created_time: number;
    channel: string;
    owner: string
}

export interface Creator {
    id: string;
    screenname: string;
    avatar_360_url: string;
}