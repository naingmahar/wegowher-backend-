export interface IPost {
    id: string
    name?: string
    message: string
    created : number
    channelId : string
}

export class PostDto{
    id: string
    name?: string
    message: string
    created : number
    channelId : string
}