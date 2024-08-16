"use client"
import { ExtendedComment } from "@/app/collection/[id]/(collectionView)/@comments/page"
import { parseDate } from "@/lib/utils"
import { Session } from "next-auth"
import Link from "next/link"
import { FC, useState } from "react"
import { Avatar } from "../avatars/avatar"
import { CommentControllers } from "../controllers/commentControllers"
import { EditCommentForm } from "./editCommentForm"

interface CommentLiProps {
  extendedComment: ExtendedComment
  session: Session | null
}

export const CommentLi: FC<CommentLiProps> = ({ extendedComment, session }) => {
  const [isInEditMode, setIsInEditMode] = useState(false)
  const parsedDate = parseDate(extendedComment.updated_at)

  const isMe = session?.user?.id === extendedComment.user_id

  const openEditMode = () => {
    if (isMe) setIsInEditMode(true)
  }
  const closeEditMode = () => {
    if (isMe) setIsInEditMode(false)
  }

  return (
    <li className="py-5 flex gap-5 w-full border-t">
      <Avatar src={extendedComment.user.image} />
      <div className="w-full">
        <div className="flex gap-x-5">
          <div className="w-full">
            <div className="text-lg text-primary font-semibold line-clamp-2 break-all">
              <Link href={`/author/${extendedComment.user_id}`}>{extendedComment.user.name}</Link>
            </div>
            <div className="text-sm text-gray-500">{parsedDate}</div>
          </div>
          {isMe && <CommentControllers commentId={extendedComment.id} openEditMode={openEditMode} />}
        </div>
        {isInEditMode && isMe ? (
          <EditCommentForm
            collectionId={extendedComment.collection_id}
            currentText={extendedComment.text}
            commentId={extendedComment.id}
            closeEditMode={closeEditMode}
          />
        ) : (
          <p className="text-base overflow-y-auto max-h-[150px] mt-3">{extendedComment.text}</p>
        )}
      </div>
    </li>
  )
}
