import { ExtendedCollection } from "@/app/collections/@collectionsList/page"
import { auth } from "@/auth"
import { COLLECTIONS_IMAGES_FOLDER } from "@/lib/constants"
import { parseDate, parseRating } from "@/lib/utils"
import Link from "next/link"
import { FC } from "react"
import { CollectionControllers } from "../controllers/collectionControllers"
import { Badge } from "../shadcn/badge"
import { CardPosterImg } from "./cardPosterImg"

export const Card: FC<ExtendedCollection> = async ({
  id,
  created_at,
  name,
  description,
  average_rating,
  tag,
  image,
  user_id
}) => {
  const finalRating = parseRating(average_rating)
  const create_date = parseDate(created_at)

  const session = await auth()

  return (
    <li className="w-[300px] 2xl:w-[350px] border flex flex-col rounded-md overflow-hidden hover:border-primary transition-colors">
      <Link href={`/collection/${id}`} className="">
        <CardPosterImg src={image ? `${COLLECTIONS_IMAGES_FOLDER}/${image.src}` : ""} />
      </Link>
      <section className="p-5">
        <div className="flex items-center">
          {tag && <Badge className="w-fit">{tag.label}</Badge>}
          <p className="text-gray-500 ml-auto text-sm">{create_date}</p>
        </div>
        <h1 className="mt-8 font-bold text-xl truncate ">{name}</h1>
        <p className="line-clamp-3 break-words mt-2 font-medium">{description ? description : "Без описания"}</p>
        <div className="mt-10 flex items-end">
          <p className="text-gray-500 text-sm">
            Рейтинг: <span className="text-primary font-semibold">{finalRating}</span>
          </p>
          {session?.user?.id === user_id && <CollectionControllers collectionId={id} userId={user_id} />}
        </div>
      </section>
    </li>
  )
}
