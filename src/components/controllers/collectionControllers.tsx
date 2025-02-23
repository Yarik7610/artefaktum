"use client"
import { deleteCollection } from "@/app/_actions/collectionActions"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { FC, useActionState, useEffect } from "react"
import { toast } from "react-toastify"

interface CollectionControllersProps {
  collectionId: string
  userId: string
}

export type InitialCollectionDeleteState = {
  error?: string
  message?: string
}

const initialState: InitialCollectionDeleteState = {
  message: undefined,
  error: undefined
}

export const CollectionControllers: FC<CollectionControllersProps> = ({ collectionId, userId }) => {
  const [state, formAction] = useActionState(deleteCollection, initialState)

  useEffect(() => {
    if (state?.error) toast.error(state.error)
    else if (state?.message) toast.success(state?.message)
  }, [state])

  return (
    <div className="flex  ml-auto">
      <Link
        title="Редактировать коллекцию"
        href={`/collection/${collectionId}/edit`}
        aria-label="Edit collection"
        className="hover:bg-gray-200 w-[35px] sm:w-[40px] h-[35px] sm:h-[40px] rounded-full flex justify-center items-center">
        <Pencil />
      </Link>
      <form action={formAction}>
        <input name="collectionId" className="hidden" value={collectionId} readOnly={true} />
        <input name="userId" className="hidden" value={userId} readOnly={true} />
        <button
          title="Удалить коллекцию"
          aria-label="Delete collection"
          type="submit"
          className="hover:bg-gray-200 w-[35px] sm:w-[40px] h-[35px] sm:h-[40px] rounded-full flex justify-center items-center">
          <Trash2 />
        </button>
      </form>
    </div>
  )
}
