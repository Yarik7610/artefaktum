import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Авторы",
  description: "Страница со списком авторов"
}

export default function CollectionsLayout({
  children,
  authorsList
}: {
  children: React.ReactNode
  authorsList: React.ReactNode
}) {
  return (
    <main className="py-10 w-[85%] sm:w-[80%] mx-auto flex flex-col xl:flex-row justify-between gap-y-5 xl:gap-y-[50px]">
      <section>{children}</section>
      <section className="w-full">{authorsList}</section>
    </main>
  )
}
