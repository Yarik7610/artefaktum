import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import authConfig from "./auth.config"

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({ where: { id: user.id } })
      if (!existingUser?.email_verified) return false
      return true
    },
    session({ token, session }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub
      }
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig
})
