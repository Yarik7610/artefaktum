import { SearchParamsType } from "@/app/collections/@collectionsList/page"
import { AuthorLi } from "@/components/authorLi"
import { Pagination } from "@/components/pagination"
import { COLLECTIONS_AND_AUTHORS_PAGE_SIZE } from "@/lib/constants"
import prisma from "@/lib/db"
import { User } from "@prisma/client"
import { redirect } from "next/navigation"

interface AuthorsListProps {
  searchParams: SearchParamsType
}

export default async function AuthorsList({ searchParams }: AuthorsListProps) {
  let page = Number(searchParams?.page) || 1
  if (page < 0) page = 1

  const query = (searchParams?.query as string) || ""
  const sortBy = (searchParams?.sortBy as string) || "average_rating"
  const order = (searchParams?.orderBy as string) || "desc"

  let totalCount: number
  try {
    totalCount = await prisma.user.count({
      where: { name: { contains: query, mode: "insensitive" } }
    })
  } catch (e) {
    redirect("/authors")
  }

  const totalPages = Math.ceil(totalCount / COLLECTIONS_AND_AUTHORS_PAGE_SIZE)

  let users: User[] = []
  try {
    users = await prisma.user.findMany({
      where: {
        name: { contains: query, mode: "insensitive" }
      },
      orderBy: {
        [sortBy]: order
      },
      skip: (page - 1) * COLLECTIONS_AND_AUTHORS_PAGE_SIZE,
      take: COLLECTIONS_AND_AUTHORS_PAGE_SIZE
    })
  } catch (e) {
    redirect("/authors")
  }

  if (totalCount === 0 || page > totalPages)
    return (
      <h1 className="text-center xl:py-5 text-lg h-[125px] xl:h-[300px] flex items-center justify-center md:px-20">
        Не найдено ни одного автора по данному запрос
      </h1>
    )

  return (
    <>
      <ul className="xl:w-[95%] ml-auto">
        <li className="sm:px-5 font-semibold gap-5 w-full py-3 border-b grid grid-cols-[40px_1fr_auto] sm:grid-cols-[40px_1fr_100px_auto] md:grid-cols-[40px_0.5fr_1fr_100px_auto] ">
          <p className="col-span-2 ">Имя автора</p>
          <p className="hidden md:block truncate">Описание</p>
          <p className="hidden sm:block text-start">Кол-во коллекций</p>
          <p className="hidden sm:block text-end">Рейтинг</p>
          <div className="block sm:hidden text-end">
            <p>Кол-во коллекций /</p>
            <p>Рейтинг</p>
          </div>
        </li>
        {users.map((u, id) => (
          <AuthorLi
            key={id}
            id={u.id}
            image={u.image}
            description={u.description}
            name={u.name}
            average_rating={u.average_rating}
            collections_amount={u.collections_amount}
          />
        ))}
      </ul>
      <Pagination currentPage={page} totalPages={totalPages} scroll={true} />
    </>
  )
}
