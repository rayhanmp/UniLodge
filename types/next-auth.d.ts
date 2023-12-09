import NextAuth from 'next-auth'

declare module "next-auth" {
    interface User {
        id: int,
        name: string,
        username: string,
        email: string,
        role: string
    }
    interface Session {
        user: User & {
            id: int,
            name: string,
            username: string,
            email: string,
            role: string
        },
        token: {
            id: int,
            name: string,
            username: string,
            email: string,
            role: string
        }
    }
}