"use server"

import { InitialCommentDeleteState } from "@/components/controllers/commentControllers"
import prisma from "@/lib/db"
import { CommentFormSchema } from "@/lib/zodSchemas"
import { getUserBySession } from "@/services/user"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const createComment = async (data: z.infer<typeof CommentFormSchema>, collectionId: string) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы" }

  const validatedFields = CommentFormSchema.safeParse(data)
  if (!validatedFields.success) return { error: "Ошибка валидации формы" }

  await prisma.comment.create({
    data: {
      collection_id: collectionId,
      user_id: user.id,
      text: validatedFields.data.text
    }
  })

  revalidatePath(`/collection/${collectionId}`)
  return { message: "Комментарий опубликован!" }
}

export const updateComment = async (data: z.infer<typeof CommentFormSchema>, commentId: string) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы" }

  const validatedFields = CommentFormSchema.safeParse(data)
  if (!validatedFields.success) return { error: "Ошибка валидации формы" }

  const existingComment = await prisma.comment.findUnique({ where: { id: commentId } })
  if (!existingComment) return { error: "Такого комментария не существует" }

  if (existingComment.user_id !== user.id) return { error: "Нельзя изменять чужие комментарии" }

  await prisma.comment.update({
    where: { id: commentId },
    data: {
      text: validatedFields.data.text
    }
  })

  revalidatePath(`/collection/${existingComment.collection_id}`)
  return { message: "Комментарий обновлён!" }
}

export const deleteComment = async (prevState: InitialCommentDeleteState, data: FormData) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы", message: undefined }

  const commentId = data.get("commentId") as string

  const existingComment = await prisma.comment.findUnique({ where: { id: commentId } })
  if (!existingComment) return { error: "Такого комментария не существует", message: undefined }

  if (existingComment.user_id !== user.id) return { error: "Нельзя удалять чужие комментарии", message: undefined }

  await prisma.comment.delete({
    where: { id: commentId }
  })

  revalidatePath(`/collection/${existingComment.collection_id}`)
  return { message: "Комментарий удалён!", error: undefined }
}
