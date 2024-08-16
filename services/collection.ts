import prisma from "@/lib/db"
import { ExtendedFile } from "@/lib/zodSchemas"
import { Collection, Rating } from "@prisma/client"
import { promises as fs } from "fs"
import { COLLECTIONS_IMAGES_FOLDER } from "../lib/constants"

export const deleteCollectionFiles = async (collectionId: string) => {
  const collectionImages = await prisma.image.findMany({ where: { collection_id: collectionId } })
  for (let image of collectionImages) {
    await fs.rm(`${process.cwd()}/public${COLLECTIONS_IMAGES_FOLDER}/${image.src}`)
  }
}

export const writeCollectionFilesToFolderAndDB = async (files: ExtendedFile[], collectionId: string) => {
  for (let file of files) {
    const bufferedFile = await file.file.arrayBuffer()
    await fs.writeFile(
      `${process.cwd()}/public${COLLECTIONS_IMAGES_FOLDER}/${file.id}${file.file.name}`,
      Buffer.from(bufferedFile)
    )
    await prisma.image.create({
      data: {
        collection_id: collectionId,
        src: `${file.id}${file.file.name}`
      }
    })
  }
}

export const getExistingRating = async (collectionId: string, voterId: string) => {
  return await prisma.rating.findFirst({
    where: {
      AND: [
        {
          voter_id: voterId
        },
        { collection_id: collectionId }
      ]
    }
  })
}

export const updateUserRating = async (userId: string) => {
  const validCollectionsSums = await prisma.collection.aggregate({
    where: { AND: [{ user_id: userId }, { rating_count: { gt: 0 } }] },
    _sum: {
      average_rating: true
    }
  })

  const validCollectionsAmount = await prisma.collection.count({
    where: { AND: [{ user_id: userId }, { rating_count: { gt: 0 } }] }
  })

  let updatedUserRating = 0
  if (validCollectionsAmount !== 0)
    updatedUserRating = Number(validCollectionsSums._sum.average_rating) / validCollectionsAmount

  await prisma.user.update({
    where: { id: userId },
    data: {
      average_rating: updatedUserRating
    }
  })
}

export const updateExistingRating = async (newValue: number, existingRating: Rating, ratedCollection: Collection) => {
  if (newValue === 0) {
    await resetExistingRating(existingRating, ratedCollection)
  } else {
    if (existingRating.value === newValue) return { error: undefined, message: undefined }
    await changeExistingRating(newValue, existingRating, ratedCollection)
  }
  return {}
}

const resetExistingRating = async (existingRating: Rating, ratedCollection: Collection) => {
  await prisma.rating.delete({
    where: {
      id: existingRating.id
    }
  })
  const newRatingCount = ratedCollection.rating_count - 1
  let newAverageCollectionRating = 0
  if (newRatingCount !== 0)
    newAverageCollectionRating =
      (ratedCollection.average_rating * ratedCollection.rating_count - existingRating.value) / newRatingCount

  await prisma.collection.update({
    where: { id: ratedCollection.id },
    data: {
      average_rating: newAverageCollectionRating,
      rating_count: newRatingCount
    }
  })
}

const changeExistingRating = async (newValue: number, existingRating: Rating, ratedCollection: Collection) => {
  await prisma.rating.update({
    where: {
      id: existingRating.id
    },
    data: {
      value: newValue
    }
  })
  const newAverageCollectionRating =
    (ratedCollection.average_rating * ratedCollection.rating_count + newValue - existingRating.value) /
    ratedCollection.rating_count

  await prisma.collection.update({
    where: { id: ratedCollection.id },
    data: {
      average_rating: newAverageCollectionRating
    }
  })
}

export const createNewRating = async (newValue: number, voterId: string, ratedCollection: Collection) => {
  if (newValue === 0)
    return {
      error: "0 звезд предназначены для удаления своей оценки. Вы еще не оценивали коллекцию",
      message: undefined
    }

  await prisma.rating.create({
    data: {
      value: newValue,
      collection_id: ratedCollection.id,
      voter_id: voterId
    }
  })

  const newRatingCount = ratedCollection.rating_count + 1
  const newAverageCollectionRating =
    (ratedCollection.average_rating * ratedCollection.rating_count + newValue) / newRatingCount

  await prisma.collection.update({
    where: { id: ratedCollection.id },
    data: {
      average_rating: newAverageCollectionRating,
      rating_count: newRatingCount
    }
  })
  return {}
}
