import { Tag } from "@prisma/client"
import { FC } from "react"
import { TagButton } from "./tagButton"

interface TagsListProps {
  isActive: (tagId: number) => boolean
  handleTagClick: (tagId: number) => void
  tags: Tag[]
}

export const TagsList: FC<TagsListProps> = ({ tags, isActive, handleTagClick }) => {
  return (
    <ul className="mt-5 gap-2 flex flex-wrap h-[300px] overflow-auto">
      {tags.map((t) => (
        <li className="h-fit" key={t.id}>
          <TagButton label={t.label} isActive={isActive(t.id)} onClick={() => handleTagClick(t.id)}></TagButton>
        </li>
      ))}
    </ul>
  )
}
