export interface User {
    email: string,
    token: string,
    userId: string,
    isLoggedIn: boolean,
    nickname: string,
    avatar: string,
    slug: string,
    mentions: any[]
}