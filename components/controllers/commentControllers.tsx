"use client"
import { deleteComment } from "@/app/_actions/commentActions"
import { Pencil, Trash2 } from "lucide-react"
import { FC, useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

interface CommentControllersProps {
  commentId: string

  openEditMode: () => void
}

export type InitialCommentDeleteState = {
  error?: string
  message?: string
}

const initialState: InitialCommentDeleteState = {
  message: undefined,
  error: undefined
}

export const CommentControllers: FC<CommentControllersProps> = ({ commentId, openEditMode }) => {
  const [state, formAction] = useFormState(deleteComment, initialState)

  useEffect(() => {
    if (state?.error) toast.error(state.error)
    else if (state?.message) {
      toast.success(state?.message)
    }
  }, [state])

  return (
    <div className="flex ml-auto">
      <button
        type="button"
        onClick={openEditMode}
        title="Редактировать комментарий"
        aria-label="Edit comment"
        className="hover:bg-gray-200 w-[35px] sm:w-[40px] h-[35px] sm:h-[40px] rounded-full flex justify-center items-center">
        <Pencil />
      </button>
      <form action={formAction}>
        <input name="commentId" className="hidden" value={commentId} readOnly={true} />
        <button
          title="Удалить комментарий"
          aria-label="Delete comment"
          type="submit"
          className="hover:bg-gray-200 w-[35px] sm:w-[40px] h-[35px] sm:h-[40px] rounded-full flex justify-center items-center">
          <Trash2 />
        </button>
      </form>
    </div>
  )
}
