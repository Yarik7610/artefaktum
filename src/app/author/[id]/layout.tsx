import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Профиль автора",
  description: "Страница просмотра профиля автора"
}

export default function AuthorLayout({
  authorProfile,
  collectionsList
}: {
  authorProfile: React.ReactNode
  collectionsList: React.ReactNode
}) {
  return (
    <main className="py-10 w-[85%] sm:w-[80%] mx-auto flex flex-col xl:flex-row justify-between gap-5 max-w-[1920px]">
      <section>{authorProfile}</section>
      <section className="w-full relative">{collectionsList}</section>
    </main>
  )
}
