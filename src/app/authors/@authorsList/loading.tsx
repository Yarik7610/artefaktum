import { AuthorLiSkeleton } from "@/components/skeletons/authorLiSkeleton"

export default function AuthorsListLoading() {
  return (
    <ul className="xl:w-[95%] ml-auto pointer-events-none">
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
      {new Array(6).fill(0).map((u, id) => (
        <AuthorLiSkeleton key={id} />
      ))}
    </ul>
  )
}
