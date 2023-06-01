export interface Space {
    id: number
    title: string
    description: string
}

export interface Post {
    id: number
    content: string
    spaceId: number
    userId: number
}

export interface User {
    id: number
    address: string
    ensName: string | null
    ensAvatar: string | null
}