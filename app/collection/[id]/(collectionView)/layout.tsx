import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Коллекция автора",
  description: "Страница просмотра коллекции автора"
}

export default function AuthorLayout({
  collectionInfo,
  comments,
  imagesList
}: {
  collectionInfo: React.ReactNode
  comments: React.ReactNode
  imagesList: React.ReactNode
}) {
  return (
    <main className="py-10 w-[85%] sm:w-[80%] mx-auto max-w-[1920px]">
      <div className="flex flex-col xl:flex-row gap-y-[50px] ">
        <section>{collectionInfo}</section>
        <section className="w-full">
          <section>{imagesList}</section>
          <section className="mt-[50px] w-full xl:w-[95%] ml-auto">{comments}</section>
        </section>
      </div>
    </main>
  )
}
