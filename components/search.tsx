"use client"

import { SearchIcon, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { FC, useRef } from "react"
import { useDebouncedCallback } from "use-debounce"

interface SearchProps {
  placeholder: string
}

export const Search: FC<SearchProps> = ({ placeholder }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const searchParams = useSearchParams()
  const selectedQuery = searchParams.get("query") || ""

  const { push } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
      inputRef.current!.value = ""
    }
    params.set("page", "1")
    push(`?${params.toString()}`)
  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        ref={inputRef}
        className="peer flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={selectedQuery}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-primary" />
      {selectedQuery.length > 0 && (
        <button
          className="flex items-center justify-end absolute right-3 top-1/2 h-[30px] w-[30px] -translate-y-1/2 text-gray-500 peer-focus:text-primary"
          onClick={() => handleSearch("")}>
          <X />
        </button>
      )}
    </div>
  )
}
