import { BigAvatar } from "@/components/avatars/bigAvatar"
import { CollectionsAmount } from "@/components/colletionsAmount"

import { Separator } from "@/components/shadcn/separator"
import prisma from "@/lib/db"
import { parseRating } from "@/lib/utils"
import { notFound } from "next/navigation"

export default async function AuthorProfile({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id }
  })

  if (!user) notFound()

  const finalRating = parseRating(user.average_rating)

  return (
    <aside className="xl:w-[300px]">
      <div className="flex justify-center xl:justify-start">
        <BigAvatar src={user.image} />
      </div>
      <h2 className="text-2xl font-bold line-clamp-2 mt-8">{user.name}</h2>
      <p className="line-clamp-6 font-medium mt-2">{user.description}</p>
      <p className="text-gray-500 mt-5 py-5">
        Рейтинг: <span className="text-primary font-semibold">{finalRating} </span>
        <span className="text-sm">(На основе коллекций)</span>
      </p>
      <Separator />
      <CollectionsAmount amount={user.collections_amount} />
    </aside>
  )
}
