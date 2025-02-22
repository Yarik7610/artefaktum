"use client"

import { FC, MouseEventHandler } from "react"

interface TagButtonProps {
  label: string
  isActive: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const TagButton: FC<TagButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        isActive
          ? "text-primary-foreground bg-primary cursor-pointer inline-flex items-center rounded-full border px-3 py-1 text-base font-semibold"
          : "cursor-pointer inline-flex items-center rounded-full border px-3 py-1 text-base font-semibold hover:bg-gray-100"
      }>
      {label}
    </button>
  )
}
