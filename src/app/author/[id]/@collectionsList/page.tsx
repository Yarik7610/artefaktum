import { ExtendedCollection } from "@/app/collections/@collectionsList/page"
import { auth } from "@/auth"
import { Card } from "@/components/card/card"
import { buttonVariants } from "@/components/shadcn/button"
import prisma from "@/lib/db"
import Link from "next/link"

export default async function AuthorsCollections({ params }: { params: { id: string } }) {
  const collections = await prisma.collection.findMany({
    where: { user_id: params.id }
  })

  const collectionsTags = await prisma.tag.findMany({
    where: { id: { in: collections.map((c) => c.tag_id) } }
  })
  const collectionsImages = await prisma.image.findMany({
    where: { collection_id: { in: collections.map((c) => c.id) } }
  })

  let extendedCollections: ExtendedCollection[] = collections.map((collection) => {
    return {
      ...collection,
      tag: collectionsTags.find((tag) => tag.id === collection.tag_id),
      image: collectionsImages.find((image) => image.collection_id === collection.id)
    } as ExtendedCollection
  })

  const session = await auth()

  return (
    <>
      <div className="xl:w-[95%] ml-auto pt-0 sm:pb-5 flex justify-between items-center flex-wrap flex-col-reverse md:flex-row">
        <h2 className="text-2xl font-medium py-10 xl:py-0 text-center">Список коллекций:</h2>
        {session?.user?.id === params.id && (
          <Link href={"/creator"} className={`w-full sm:w-fit ${buttonVariants({ variant: "default" })}`}>
            Создать коллекцию
          </Link>
        )}
      </div>
      {extendedCollections.length ? (
        <ul className="xl:w-[95%] ml-auto flex gap-5 flex-wrap justify-items-center justify-center max-h-[1000px] overflow-y-auto">
          {extendedCollections.map((c) => (
            <Card key={c.id} {...c} />
          ))}
        </ul>
      ) : (
        <h1 className="text-lg text-center h-[100px] xl:h-[350px] flex items-center justify-center">Коллекций нет</h1>
      )}
    </>
  )
}
