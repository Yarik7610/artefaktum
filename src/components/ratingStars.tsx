"use client"
import { rateCollection } from "@/app/_actions/collectionActions"
import { Star } from "lucide-react"
import { FC, useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { SubmitFormBtn } from "./btns/submitFormBtn"

interface RatingStarsProps {
  collectionId: string
  previousRating: number
}

export type InitialRatingStarsState = {
  error?: string
  message?: string
}

const initialState: InitialRatingStarsState = {
  message: undefined,
  error: undefined
}

export const RatingStars: FC<RatingStarsProps> = ({ collectionId, previousRating }) => {
  const [rating, setRating] = useState(previousRating)
  const hadleSetRating = (val: number) => {
    setRating(rating === val ? 0 : val)
  }

  const [state, formAction] = useActionState(rateCollection, initialState)

  useEffect(() => {
    if (state?.error) toast.error(state.error)
    else if (state?.message) toast.success(state?.message)
  }, [state])

  return (
    <div className="flex items-center justify-between">
      <ul className="flex items-center">
        {new Array(5).fill(0).map((_, i) => (
          <li key={i} className="cursor-pointer" onClick={() => hadleSetRating(i + 1)}>
            <Star fill={`${rating > i ? "black" : "none"}`} />
          </li>
        ))}
      </ul>
      <form action={formAction}>
        <input type="hidden" name="collectionId" value={collectionId} />
        <input type="hidden" name="value" value={rating} />
        <SubmitFormBtn variant="outline" className="w-[110px]">
          Оценить
        </SubmitFormBtn>
      </form>
    </div>
  )
}
