"use server"

import { InitialCollectionDeleteState } from "@/components/controllers/collectionControllers"
import { InitialRatingStarsState } from "@/components/ratingStars"
import prisma from "@/lib/db"
import { CreatorFormSchema, CreatorFormSchemaType, ExtendedFile, RatingStarsSchema } from "@/lib/zodSchemas"
import {
  createNewRating,
  deleteCollectionFiles,
  getExistingRating,
  updateExistingRating,
  updateUserRating,
  writeCollectionFilesToFolderAndDB
} from "@/services/collection"
import { getUserBySession } from "@/services/user"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const deleteCollection = async (prevState: InitialCollectionDeleteState, data: FormData) => {
  const collectionId = data.get("collectionId") as string
  const userId = data.get("userId") as string

  if (!collectionId || !userId) return { error: "Неверные данные для удаления коллекции", message: undefined }

  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы", message: undefined }

  if (user.id !== userId) return { error: "Нельзя удалять чужую коллекцию", message: undefined }

  await deleteCollectionFiles(collectionId)
  await prisma.collection.delete({ where: { id: collectionId } })

  await prisma.user.update({
    where: { id: user.id },
    data: {
      collections_amount: { increment: -1 }
    }
  })

  await updateUserRating(user.id)

  revalidatePath("/collections")
  revalidatePath(`/author/${userId}`)
  revalidatePath(`/collection/${collectionId}`)
  return { message: "Коллекция удалена!", error: undefined }
}

export const createCollection = async (formData: FormData) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы" }

  const files = formData.getAll("files") as File[]
  const filesIds = formData.getAll("filesIds") as string[]
  const extendedFiles: ExtendedFile[] = files.map((f, idx) => ({ file: f, id: filesIds[idx] }))

  const zodData: CreatorFormSchemaType = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    tag: formData.get("tag") as string,
    files: extendedFiles
  }

  const validatedFields = CreatorFormSchema.safeParse(zodData)
  if (!validatedFields.success) return { error: "Ошибка валидации данных" }

  const tagsCount = await prisma.tag.count()
  if (parseInt(validatedFields.data.tag) > tagsCount || parseInt(validatedFields.data.tag) < 1)
    return { error: "Такого тега не существует" }

  const newCollection = await prisma.collection.create({
    data: {
      user_id: user.id,
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      tag_id: parseInt(validatedFields.data.tag)
    }
  })

  await prisma.user.update({
    where: { id: user.id },
    data: {
      collections_amount: { increment: 1 }
    }
  })

  await writeCollectionFilesToFolderAndDB(validatedFields.data.files, newCollection.id)

  revalidatePath("/creator")
  return { message: "Коллекция создана!" }
}

export const updateCollection = async (formData: FormData) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы" }

  const userId = formData.get("user_id") as string
  if (user.id !== userId) return { error: "Нельзя изменять чужую коллекцию" }

  const collectionId = formData.get("id") as string
  const files = formData.getAll("files") as File[]
  const filesIds = formData.getAll("filesIds") as string[]
  const extendedFiles: ExtendedFile[] = files.map((f, idx) => ({ file: f, id: filesIds[idx] }))

  const zodData: CreatorFormSchemaType = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    tag: formData.get("tag") as string,
    files: extendedFiles
  }

  const validatedFields = CreatorFormSchema.safeParse(zodData)
  if (!validatedFields.success) return { error: "Ошибка валидации данных" }

  const tagsCount = await prisma.tag.count()
  if (parseInt(validatedFields.data.tag) > tagsCount || parseInt(validatedFields.data.tag) < 1)
    return { error: "Такого тега не существует" }

  await prisma.collection.update({
    where: {
      id: collectionId
    },
    data: {
      user_id: user.id,
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      tag_id: parseInt(validatedFields.data.tag)
    }
  })

  await deleteCollectionFiles(collectionId)
  await prisma.image.deleteMany({ where: { collection_id: collectionId } })
  await writeCollectionFilesToFolderAndDB(validatedFields.data.files, collectionId)

  redirect(`/collection/${collectionId}`)
}

export const rateCollection = async (prevState: InitialRatingStarsState, formData: FormData) => {
  const user = await getUserBySession()
  if (!user) return { error: "Вы не авторизованы", message: undefined }

  const collectionId = formData.get("collectionId") as string
  let newValue = Number(formData.get("value") as string)

  const validatedField = RatingStarsSchema.safeParse({ value: newValue })
  if (!validatedField.success) return { error: validatedField.error.issues[0].message, message: undefined }

  const ratedCollection = await prisma.collection.findUnique({ where: { id: collectionId } })
  if (!ratedCollection) return { error: "Такой коллекции не существует", message: undefined }

  if (user.id === ratedCollection.user_id) return { error: "Нельзя оценивать свою коллекцию", message: undefined }

  const existingRating = await getExistingRating(ratedCollection.id, user.id)
  if (existingRating) {
    const result = await updateExistingRating(newValue, existingRating, ratedCollection)
    if (Object.keys(result).length > 0) return result
  } else {
    const result = await createNewRating(newValue, user.id, ratedCollection)
    if (Object.keys(result).length > 0) return result
  }

  await updateUserRating(ratedCollection.user_id)

  revalidatePath(`/collection/${ratedCollection.id}`)
  return { message: "Коллекция оценена!", error: undefined }
}
