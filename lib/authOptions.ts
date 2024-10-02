import { type NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./db";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "smithrocky@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and Password are required")
        };

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          }
        })

        if (!user) {
          throw new Error("Email does not exist.Create a new account")
        }

        const isPassword = await compare(credentials.password, user.password as string)

        if (!isPassword) {
          throw new Error("Incorrect Password")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {

    jwt: ({ token, user }) => {

      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }

      return token
    },
    session: ({ session, token }) => {

      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
        }
      }
    }
  }
}