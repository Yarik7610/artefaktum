import { parseRating } from "@/lib/utils"
import Link from "next/link"
import { FC } from "react"
import { Avatar } from "./avatars/avatar"

interface AuthorLiProps {
  id: string
  image: string | null
  description: string | null
  name: string
  average_rating: number
  collections_amount: number
}
export const AuthorLi: FC<AuthorLiProps> = ({ id, image, description, name, average_rating, collections_amount }) => {
  const finalRating = parseRating(average_rating)

  return (
    <li>
      <Link
        href={`/author/${id}`}
        className="sm:px-5 gap-5 w-full py-3 border-b grid items-center grid-cols-[40px_1fr_50px] sm:grid-cols-[40px_1fr_115px_50px] md:grid-cols-[40px_0.5fr_1fr_115px_50px] hover:bg-gray-100">
        <p>
          <Avatar src={image} />
        </p>
        <p className="truncate">{name}</p>
        <p className="hidden md:block truncate">{description}</p>
        <p className="hidden sm:block truncate text-start">{collections_amount}</p>
        <p className="hidden sm:block truncate text-end">{finalRating}</p>
        <div className="block sm:hidden text-end">
          <p>{collections_amount} /</p>
          <p>{finalRating}</p>
        </div>
      </Link>
    </li>
  )
}
