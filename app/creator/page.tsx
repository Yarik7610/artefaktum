import { CreatorForm } from "@/components/creatorForm"
import prisma from "@/lib/db"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Создание коллекции",
  description: "Страница для создания коллекции"
}

export default async function CreatorPage() {
  const tags = await prisma.tag.findMany()

  return (
    <main className="py-10 w-[90%] mx-auto ">
      <h1 className="text-2xl font-bold py-5">Создание коллекции</h1>
      <CreatorForm tags={tags} />
    </main>
  )
}
