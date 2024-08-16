import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Коллекции",
  description: "Страница с коллекциями пользователей"
}

export default function CollectionsLayout({
  collectionsAside,
  collectionsList
}: {
  collectionsAside: React.ReactNode
  collectionsList: React.ReactNode
}) {
  return (
    <main className="py-10 w-[85%] sm:w-[80%] mx-auto flex flex-col lg:flex-row gap-y-5 lg:gap-y-[50px] max-w-[1920px]">
      <section>{collectionsAside}</section>
      <section className="w-full relative">{collectionsList}</section>
    </main>
  )
}
