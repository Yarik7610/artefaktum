"use client"
import { Tag } from "@prisma/client"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { FC, useState } from "react"
import { Button } from "../shadcn/button"
import { TagsList } from "./tagsList"

interface TagsSectionProps {
  tags: Tag[]
}
export const TagsSection: FC<TagsSectionProps> = ({ tags }) => {
  const [isOpened, setIsOpened] = useState(false)
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const handleTagClick = (tagId: number) => {
    const params = new URLSearchParams(searchParams)
    const arr = params.getAll("tag")
    if (!arr.find((id) => Number(id) === tagId)) {
      params.append("tag", tagId.toString())
    } else {
      params.delete("tag", tagId.toString())
    }
    params.set("page", "1")
    push(`?${params.toString()}`)
  }

  const clearTags = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("tag")
    params.set("page", "1")
    push(`?${params.toString()}`)
  }

  const getActiveTagsCount = () => {
    const params = new URLSearchParams(searchParams)
    return params.getAll("tag").length
  }

  const isActive = (tagId: number) => {
    const params = new URLSearchParams(searchParams)
    const arr = params.getAll("tag")
    if (arr.find((id) => Number(id) === tagId)) return true
    return false
  }

  return (
    <section>
      <div className="flex flex-wrap justify-between items-center">
        <h2 className="font-semibold text-xl">Теги ({getActiveTagsCount()}):</h2>
        <div className="flex items-center gap-2">
          <Button onClick={clearTags} className="my-2">
            Очистить теги
          </Button>
          <button
            title={isOpened ? "Скрыть теги" : "Раскрыть теги"}
            aria-label="Open/close tag-filters list"
            className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-gray-200"
            onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>
      {isOpened && <TagsList isActive={isActive} handleTagClick={handleTagClick} tags={tags} />}
    </section>
  )
}
