"use client"

import { Crown, Gem, Medal, Star } from "lucide-react"
import { FC } from "react"

interface CollectionsAmountProps {
  amount: number
}

export const CollectionsAmount: FC<CollectionsAmountProps> = ({ amount }) => {
  let icon = null
  if (amount < 5) icon = <Star fill="#CD7F32" /> //bronze
  else if (amount < 10) icon = <Medal fill="#C0C0C0" /> //silver
  else if (amount < 15) icon = <Crown fill="#ffd700" /> //gold
  else icon = <Gem fill="#4EE2EC" /> //diamond

  return (
    <section className="py-5 flex gap-2 items-center">
      {amount >= 1 && icon && icon}

      <p className="text-gray-500">
        Кол-во коллекций: <span className="text-primary font-semibold">{amount}</span>
      </p>
    </section>
  )
}
