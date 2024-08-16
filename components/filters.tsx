"use client"
import { ArrowDown01, ArrowDown10 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { FC } from "react"

const orders = ["asc", "desc"]

export interface Filter {
  param: string
  label: string
}

interface FiltersProps {
  filters: Filter[]
}
export const Filters: FC<FiltersProps> = ({ filters }) => {
  const searchParams = useSearchParams()
  const selectedFilter = searchParams.get("sortBy") || filters[0].param
  const selectedOrder = searchParams.get("orderBy") || "desc"
  const { push } = useRouter()

  const handleFilterClick = (param: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("sortBy", param)
    params.set("page", "1")
    push(`?${params.toString()}`)
  }

  const handleSortByClick = (order: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("orderBy", order)
    params.set("page", "1")
    push(`?${params.toString()}`)
  }

  return (
    <section>
      <h2 className="font-semibold text-xl">Сортировка по:</h2>
      <section className="mt-5 flex justify-between">
        <article className="flex gap-5 flex-wrap">
          {filters.map((f, i) => (
            <button
              key={i}
              onClick={() => handleFilterClick(f.param)}
              className={
                selectedFilter == f.param
                  ? "text-primary font-semibold"
                  : "text-gray-500 transition-colors hover:text-primary"
              }>
              {f.label}
            </button>
          ))}
        </article>
        <article className="flex gap-2">
          {orders.map((o, i) => (
            <button
              title={o === "desc" ? "По убыванию" : "По возрастанию"}
              key={i}
              onClick={() => handleSortByClick(o)}
              aria-label={o}
              className={`${
                selectedOrder === o ? "bg-gray-200" : "hover:bg-gray-200"
              } w-[40px] h-[40px] flex justify-center items-center rounded-full `}>
              {i === 0 ? <ArrowDown01 /> : <ArrowDown10 />}
            </button>
          ))}
        </article>
      </section>
    </section>
  )
}
