import prisma from "@/lib/db"
import { SignInFormSchema } from "@/lib/zodSchemas"
import { compare } from "bcryptjs"
import { type NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = SignInFormSchema.safeParse(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await prisma.user.findUnique({ where: { email } })
          if (!user) return null

          const passwordsMatch = await compare(password, user.password)
          if (passwordsMatch) return user
        }
        return null
      }
    })
  ]
} satisfies NextAuthConfig
