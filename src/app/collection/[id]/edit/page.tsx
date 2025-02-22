import { UpdaterForm } from "@/components/collectionConstructor/updaterForm"
import prisma from "@/lib/db"
import { getUserBySession } from "@/services/user"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Обновление коллекции",
  description: "Страница для изменения коллекции"
}

export default async function UpdaterPage({ params }: { params: { id: string } }) {
  const user = await getUserBySession()

  const collection = await prisma.collection.findUnique({ where: { id: params.id } })
  if (!collection) notFound()

  if (user?.id !== collection.user_id) redirect(`/collection/${params.id}`)

  const tags = await prisma.tag.findMany()

  return (
    <main className="py-10 w-[90%] mx-auto ">
      <h1 className="text-2xl font-bold py-5">Изменение коллекции</h1>
      <UpdaterForm tags={tags} collection={collection} />
    </main>
  )
}
