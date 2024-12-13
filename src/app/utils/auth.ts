import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from "./db";
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,  // Add this for debugging
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          }),
          CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
              if(!credentials?.email || !credentials?.password) {
                throw new Error("Invalid credentials")
              }
              const user = await prisma.user.findUnique({
                where: {
                  email: credentials.email
                }
              })
              if(!user || !user?.hashedPassword) {
                throw new Error("Invalid credentials")
              }
              const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
              if(!isCorrectPassword) {
                throw new Error("Invalid credentials")
              }
              return user
            }
          })
    ]
}
export default NextAuth(authOptions)