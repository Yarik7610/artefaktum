import { auth } from "@/auth"
import prisma from "@/lib/db"
import { promises as fs } from "fs"
import { USERS_AVATARS_FOLDER } from "../lib/constants"

export const getUserBySession = async () => {
  const session = await auth()

  let user = null
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session.user?.id }
    })
  }
  return user
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  } catch (e) {
    return null
  }
}

export const deleteAvatarFile = async (filename: string) => {
  await fs.rm(`${process.cwd()}/public${USERS_AVATARS_FOLDER}/${filename}`)
}
