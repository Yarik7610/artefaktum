import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseRating = (average_rating: number | null | undefined) => {
  return average_rating ? (average_rating >= 1 ? average_rating.toPrecision(3) : average_rating.toPrecision(2)) : "Нет"
}

export const parseDate = (created_at: Date) => {
  return new Date(created_at).toISOString().slice(0, 10)
}

export const getAcceptableExtensions = (extensions: string[]) => {
  return extensions.map((ext) => `${ext}`).join(", ")
}
