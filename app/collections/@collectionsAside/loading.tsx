import { Filters } from "@/components/filters"
import { Preloader } from "@/components/prealoder"
import { Search } from "@/components/search"
import { Separator } from "@/components/shadcn/separator"

export default function CollectionsTagsAsideLoading() {
  return (
    <aside className="lg:w-[300px] pointer-events-none">
      <h1 className="text-2xl font-semibold py-5">Найти коллекцию</h1>
      <Search placeholder="По названию или описанию" />
      <Separator className="my-5" />
      <Filters
        filters={[
          { param: "average_rating", label: "Рейтингу" },
          { param: "created_at", label: "Новизне" },
          { param: "rating_count", label: "Кол-ву отметок" }
        ]}
      />
      <Separator className="my-5" />
      <Preloader />
    </aside>
  )
}
