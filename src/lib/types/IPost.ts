interface IPost {
    id: number
    author_id: number
    content: string
    views: number
    shares: number
    likes: number
    usersLiked: string[]
    comments: string[]
    timeCreated: number
}

export default IPost;