"use server"

import { signIn } from "@/auth"
import prisma from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { SignInFormSchema, SignUpFormSchema } from "@/lib/zodSchemas"
import { getUserByEmail } from "@/services/user"
import { getVerificationTokenByToken } from "@/services/verificationToken"
import { hash } from "bcryptjs"
import { AuthError } from "next-auth"
import { z } from "zod"

export const signUp = async (data: z.infer<typeof SignUpFormSchema>) => {
  const validatedFields = SignUpFormSchema.safeParse(data)
  if (!validatedFields.success) {
    return { error: "Ошибка валидации формы" }
  }

  const existingUser = await getUserByEmail(validatedFields.data.email)
  if (existingUser) return { error: "Данный пользователь уже зарегистрирован" }

  const hashedPassword = await hash(validatedFields.data.password, 7)
  await prisma.user.create({
    data: {
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: hashedPassword
    }
  })

  const verificationToken = await generateVerificationToken(validatedFields.data.email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { message: "На почту была отправлена ссылка для её подтверждения!" }
}

export const signInAction = async (data: z.infer<typeof SignInFormSchema>) => {
  const validatedFields = SignInFormSchema.safeParse(data)
  if (!validatedFields.success) {
    return { error: "Ошибка валидации формы" }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser) return { error: "Такого пользователя не существует" }

  if (!existingUser.email_verified) {
    const verificationToken = await generateVerificationToken(existingUser.email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    return { error: "Подтвердите почту для входа", type: "info" }
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/settings" }) //to change url manually in browser (middleware redirects, but doesn't change url)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Введены неверные данные" }
        default:
          return { error: "Произошла ошибка" }
      }
    }
    //to make redirect work
    throw error
  }
}

export const verificateEmailAction = async (token: string, authorizedUserId: string | undefined) => {
  const existingToken = await getVerificationTokenByToken(token)
  if (!existingToken) return { error: "Токена не существует" }

  const hasExpired = new Date(existingToken.expires) < new Date()
  const existingUser = await getUserByEmail(existingToken.email)

  let userToUpdateId = authorizedUserId
  if (!userToUpdateId) {
    if (hasExpired) return { error: "Токен истёк. Авторизуйтесь снова для получения нового сообщения на почту" }
    if (!existingUser) return { error: "Почта не зарегистрирована" }
    userToUpdateId = existingUser.id
  } else {
    if (hasExpired) {
      await prisma.user.update({
        where: { id: userToUpdateId },
        data: {
          email_verified: true
        }
      })
      return { error: "Токен истёк. Введите новую почту повторно для получения нового токена" }
    }
    if (existingUser) return { error: "Почта уже занята. Попробуйте другую" }
  }

  await prisma.user.update({
    where: { id: userToUpdateId },
    data: {
      email_verified: true,
      email: existingToken.email
    }
  })

  await prisma.verificationToken.delete({
    where: { id: existingToken.id }
  })
  return { message: "Почта подтверждена!" }
}
