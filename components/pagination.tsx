"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { FC, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./shadcn/alert-dialog"
import { Button } from "./shadcn/button"
import { Input } from "./shadcn/input"
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  Pagination as PaginationShad
} from "./shadcn/pagination"

interface PaginationProps {
  currentPage: number
  totalPages: number
  scroll: boolean
}

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, scroll }) => {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (str: string) => {
    if (str === "") {
      setInputValue(str)
      return
    }
    let inputValue = parseInt(str, 10)
    if (!Number.isNaN(inputValue) && inputValue > 0 && inputValue <= totalPages) {
      setInputValue(inputValue as unknown as string)
    }
  }

  const createPageURL = (page: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    push(`?${params.toString()}`, { scroll: scroll })
  }

  return (
    <PaginationShad className="pt-10">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            aria-label="Previous page"
            onClick={() => createPageURL(currentPage - 1)}
            className={`border-transparent flex items-center justify-center py-2 px-3 ${
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }`}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={true}
            variant="outline"
            onClick={() => createPageURL(currentPage)}
            className={`flex items-center justify-center py-2 px-4`}>
            {currentPage}
          </Button>
        </PaginationItem>
        {currentPage + 1 < totalPages && (
          <Button
            variant="outline"
            onClick={() => createPageURL(currentPage + 1)}
            className={`border-transparent flex items-center justify-center py-2 px-4`}>
            {currentPage + 1}
          </Button>
        )}
        {currentPage + 2 < totalPages && (
          <Button
            variant="outline"
            onClick={() => createPageURL(currentPage + 2)}
            className={`border-transparent flex items-center justify-center py-2 px-4`}>
            {currentPage + 2}
          </Button>
        )}
        {totalPages - currentPage > 3 && (
          <PaginationItem>
            <AlertDialog>
              <AlertDialogTrigger aria-label="Other page">
                <PaginationEllipsis />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Укажите номер страницы:</AlertDialogTitle>
                  <AlertDialogDescription>
                    <Input
                      value={inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="text-primary"
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Закрыть</AlertDialogCancel>
                  <AlertDialogAction onClick={() => createPageURL(inputValue)}>Перейти</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </PaginationItem>
        )}
        {currentPage < totalPages && (
          <Button
            variant="outline"
            onClick={() => createPageURL(totalPages)}
            className={`border-transparent flex items-center justify-center py-2 px-4`}>
            {totalPages}
          </Button>
        )}
        <PaginationItem>
          <Button
            variant="outline"
            aria-label="Next page"
            onClick={() => createPageURL(currentPage + 1)}
            className={`border-transparent flex items-center justify-center py-2 px-3 ${
              currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined
            }`}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationShad>
  )
}
