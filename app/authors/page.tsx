import { Filters } from "@/components/filters"
import { Search } from "@/components/search"
import { Separator } from "@/components/shadcn/separator"

export default function CollectionsPageAside() {
  return (
    <aside className="xl:w-[300px]">
      <h1 className="text-2xl font-semibold py-5">Найти автора</h1>
      <Search placeholder="По имени автора" />
      <Separator className="my-5" />
      <Filters
        filters={[
          { param: "average_rating", label: "Рейтингу" },
          { param: "collections_amount", label: "Кол-ву коллекций" }
        ]}
      />
    </aside>
  )
}
