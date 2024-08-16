import { auth } from "@/auth"
import { CollectionControllers } from "@/components/controllers/collectionControllers"
import { RatingStars } from "@/components/ratingStars"
import { Badge } from "@/components/shadcn/badge"
import { buttonVariants } from "@/components/shadcn/button"
import { Separator } from "@/components/shadcn/separator"
import prisma from "@/lib/db"
import { parseDate, parseRating } from "@/lib/utils"
import { getExistingRating } from "@/services/collection"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function CollectionInfo({ params }: { params: { id: string } }) {
  const collection = await prisma.collection.findUnique({
    where: { id: params.id }
  })

  if (!collection) {
    notFound()
  }

  const tag = await prisma.tag.findFirst({ where: { id: collection.tag_id } })

  const finalRating = parseRating(collection.average_rating)
  const create_date = parseDate(collection.created_at)

  const session = await auth()

  const existingRating = await getExistingRating(collection.id, session?.user?.id!)

  return (
    <aside className="md:w-[70%] md:mx-auto xl:w-[300px] py-5">
      <div className="flex gap-x-5">
        <h2 className="text-2xl font-bold line-clamp-2">{collection.name}</h2>
        {session?.user?.id === collection.user_id && (
          <CollectionControllers collectionId={collection.id} userId={collection.user_id} />
        )}
      </div>
      <p className="max-h-[400px] overflow-y-auto font-medium mt-2">
        {collection.description ? collection.description : "Без описания"}
      </p>
      <div className="flex justify-between pt-8 pb-5">
        {tag && <Badge className="w-fit">{tag.label}</Badge>}
        <p className="text-gray-500 ml-auto text-sm">{create_date}</p>
      </div>
      <Separator />
      <section className="py-5 flex flex-col gap-5">
        <p className="text-gray-500">
          Рейтинг: <span className="text-primary font-semibold">{finalRating} </span>
          {collection.rating_count > 0 && <span className="text-sm">({collection.rating_count} голосов)</span>}
        </p>
        {session?.user?.id !== collection.user_id && (
          <RatingStars
            collectionId={collection.id}
            previousRating={existingRating?.value ? existingRating?.value : 0}
          />
        )}
      </section>
      <Separator />
      <Link className={`mt-5 w-full ${buttonVariants({ variant: "default" })}`} href={`/author/${collection.user_id}`}>
        К автору
      </Link>
    </aside>
  )
}
