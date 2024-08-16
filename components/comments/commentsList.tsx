import { ExtendedComment } from "@/app/collection/[id]/(collectionView)/@comments/page"
import { Session } from "next-auth"
import { FC } from "react"
import { CommentLi } from "./commentLi"

interface CommentsListProps {
  extendedComments: ExtendedComment[]
  session: Session | null
}

export const CommentsList: FC<CommentsListProps> = ({ extendedComments, session }) => {
  return (
    <ul className="mt-5">
      {extendedComments.map((c) => (
        <CommentLi key={c.id} extendedComment={c} session={session} />
      ))}
    </ul>
  )
}
