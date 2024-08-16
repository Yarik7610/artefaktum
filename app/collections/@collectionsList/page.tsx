import { Card } from "@/components/card/card"
import { Pagination } from "@/components/pagination"
import { COLLECTIONS_AND_AUTHORS_PAGE_SIZE } from "@/lib/constants"
import prisma from "@/lib/db"
import { Collection, Image, Tag } from "@prisma/client"
import { redirect } from "next/navigation"

export type SearchParamsType = { [key: string]: string | string[] | undefined }

interface CollectionsListProps {
  searchParams: SearchParamsType
}

export type ExtendedCollection = Collection & {
  tag?: Tag //if tag will be deleted from db
  image?: Image // //if image will be deleted from db (less possible)
}

export default async function CollectionsList({ searchParams }: CollectionsListProps) {
  let page = Number(searchParams?.page) || 1
  if (page < 0) page = 1

  const query = (searchParams?.query as string) || ""
  const sortBy = (searchParams?.sortBy as string) || "average_rating"
  const order = (searchParams?.orderBy as string) || "desc"

  let tags: number[] = []
  if (searchParams) {
    if (!Array.isArray(searchParams.tag)) {
      if (searchParams.tag) tags.push(Number(searchParams.tag))
    } else tags = searchParams.tag.map(Number)
  }
  const tagsAmount = await prisma.tag.count()
  if (tags.some((t) => t < 1 || t > tagsAmount)) redirect("/collections")

  let totalCount: number
  try {
    totalCount = await prisma.collection.count({
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" }
          },
          {
            description: { contains: query, mode: "insensitive" }
          }
        ],
        AND: {
          ...(tags.length > 0 ? { tag_id: { in: tags } } : {})
        }
      }
    })
  } catch (e) {
    redirect("/collections")
  }

  const totalPages = Math.ceil(totalCount / COLLECTIONS_AND_AUTHORS_PAGE_SIZE)

  let collections: Collection[] = []
  let extendedCollections: ExtendedCollection[] = []
  try {
    collections = await prisma.collection.findMany({
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" }
          },
          {
            description: { contains: query, mode: "insensitive" }
          }
        ],
        AND: {
          ...(tags.length > 0 ? { tag_id: { in: tags } } : {})
        }
      },
      orderBy: {
        [sortBy]: order
      },
      skip: (page - 1) * COLLECTIONS_AND_AUTHORS_PAGE_SIZE,
      take: COLLECTIONS_AND_AUTHORS_PAGE_SIZE
    })

    const collectionsTags = await prisma.tag.findMany({
      where: { id: { in: collections.map((c) => c.tag_id) } }
    })
    const collectionsImages = await prisma.image.findMany({
      where: { collection_id: { in: collections.map((c) => c.id) } }
    })
    extendedCollections = collections.map((collection) => {
      return {
        ...collection,
        tag: collectionsTags.find((tag) => tag.id === collection.tag_id),
        image: collectionsImages.find((image) => image.collection_id === collection.id)
      } as ExtendedCollection
    })
  } catch (e) {
    redirect("/collections")
  }

  if (totalCount === 0 || page > totalPages)
    return (
      <h1 className="text-center lg:py-5 text-lg h-[125px] lg:h-[300px] flex items-center justify-center md:px-20">
        Не найдено ни одной коллекции по данному запросу
      </h1>
    )

  return (
    <>
      <ul className="lg:w-[95%] ml-auto flex gap-5 flex-wrap justify-items-center justify-center">
        {extendedCollections.map((c) => (
          <Card key={c.id} {...c} />
        ))}
      </ul>
      <Pagination currentPage={page} totalPages={totalPages} scroll={true} />
    </>
  )
}
