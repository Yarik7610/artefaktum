"use server"

import { signOut } from "@/auth"
import { USERS_AVATARS_FOLDER } from "@/lib/constants"
import prisma from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import {
  AvatarFormSchema,
  AvatarFormSchemaType,
  DescriptionFormSchema,
  EmailFormSchema,
  PasswordFormSchema,
  UsernameFormSchema
} from "@/lib/zodSchemas"
import { deleteCollectionFiles } from "@/services/collection"
import { deleteAvatarFile, getUserByEmail, getUserBySession } from "@/services/user"
import { compare, hash } from "bcryptjs"
import { promises as fs } from "fs"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

export const updateUsername = async (data: z.infer<typeof UsernameFormSchema>) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы" }

  const validatedFields = UsernameFormSchema.safeParse(data)
  if (!validatedFields.success) return { error: "Ошибка валидации формы" }

  if (validatedFields.data.name === user.name) return

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      name: validatedFields.data.name
    }
  })
  revalidatePath("/settings")
  return { message: "Имя изменено!" }
}

export const updateDescription = async (data: z.infer<typeof DescriptionFormSchema>) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы" }

  const validatedFields = DescriptionFormSchema.safeParse(data)
  if (!validatedFields.success) return { error: "Ошибка валидации формы" }

  if (validatedFields.data.description == user.description) return

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      description: validatedFields.data.description
    }
  })
  revalidatePath("/settings")
  return { message: "Описание изменено!" }
}

export const updateEmail = async (data: z.infer<typeof EmailFormSchema>) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы" }
  if (!user.email_verified) return { error: "Для смены почты подтвердите текущую" }

  const validatedFields = EmailFormSchema.safeParse(data)
  if (!validatedFields.success) return { error: "Ошибка валидации формы" }

  if (validatedFields.data.email === user.email) return

  const existingEmail = await getUserByEmail(validatedFields.data.email)
  if (existingEmail) return { error: "Почта занята. Попробуйте другую" }

  const verificationToken = await generateVerificationToken(validatedFields.data.email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token, "update")
  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      email_verified: false
    }
  })
  return { message: "Подтвердите почту для изменения данных" }
}

export const updatePassword = async (data: z.infer<typeof PasswordFormSchema>) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы" }
  if (!user.email_verified) return { error: "Для смены пароля подтвердите почту" }

  const validatedFields = PasswordFormSchema.safeParse(data)
  if (!validatedFields.success) return { error: "Ошибка валидации формы" }

  const oldPasswordsMatch = await compare(validatedFields.data.oldPassword, user.password)
  if (!oldPasswordsMatch) return { error: "Неверный старый пароль" }

  const newAndOldpasswordsMatch = await compare(validatedFields.data.newPassword, user.password)
  if (newAndOldpasswordsMatch) return { error: "Значения нового и старого паролей не должны совпадать" }

  const hashedPassword = await hash(validatedFields.data.newPassword, 7)

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      password: hashedPassword
    }
  })
  revalidatePath("/settings")
  return { message: "Пароль изменён!" }
}

export const updateAvatar = async (formData: FormData) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы" }

  const file = formData.get("file") as File

  //zod wants always instance of file and gives error on undefined and null though they are valid values
  if (file) {
    const zodData: AvatarFormSchemaType = {
      file
    }
    const validatedField = AvatarFormSchema.safeParse(zodData)
    if (!validatedField.success) return { error: "Ошибка валидации формы" }
  }

  if (user.image) await deleteAvatarFile(user.image)

  if (!file) {
    if (!user.image) return
    await prisma.user.update({
      where: { id: user.id },
      data: {
        image: null
      }
    })
    revalidatePath("/settings")
    return { message: "Аватар обнулён!" }
  }

  const randomId = uuidv4()
  const bufferedFile = await file.arrayBuffer()
  await fs.writeFile(
    `${process.cwd()}/public${USERS_AVATARS_FOLDER}/${randomId}${file.name}`,
    Buffer.from(bufferedFile)
  )

  await prisma.user.update({
    where: { id: user.id },
    data: {
      image: `${randomId}${file.name}`
    }
  })

  revalidatePath("/settings")
  return { message: "Аватар изменён!" }
}

export const deleteUser = async () => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы" }
  if (user.image) await deleteAvatarFile(user.image)

  const userCollections = await prisma.collection.findMany({ where: { user_id: user.id } })

  for (let userCollection of userCollections) {
    await deleteCollectionFiles(userCollection.id)
  }

  await prisma.user.delete({
    where: { id: user.id }
  })

  await prisma.verificationToken.deleteMany({
    where: { email: user.email }
  })

  await prisma.passwordResetToken.deleteMany({
    where: { email: user.email }
  })

  await signOut({ redirectTo: "/sign-in" })
}
