import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '../../prisma/db';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    pages: {
        signIn: "/sign-in"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    providers: [
      CredentialsProvider({
        name: "Credentials",

        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {

            if (!credentials?.email || !credentials?.password) {
                return null;
            }

            const existingResident = await db.resident.findUnique ({
                where: {email: credentials?.email}
            })

            if (!existingResident) {
                return null;
            }

            const passwordMatch = await compare(credentials.password, existingResident.password);
            console.log(passwordMatch)
            if (!passwordMatch) {
                return null;
            }

            return {
                id: existingResident.residentId,
                name: existingResident.name,
                username: existingResident.username,
                email: existingResident.email,
            }
        }
      })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                }
            }
            return token
        },
        async session ({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    username: token.username,
                    email: token.email,
                    role: token.role
                }
            }
        }
    }
}