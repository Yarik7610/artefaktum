import { buttonVariants } from "@/components/shadcn/button"
import Link from "next/link"

export default function AuthorNotFound() {
  return (
    <main className="w-[85%] sm:w-[80%] mx-auto h-[calc(100vh-80px)] flex flex-col gap-y-5 items-center justify-center max-w-[1920px]">
      <h1 className="text-2xl font-semibold text-center">Данный автор не был найден</h1>
      <Link href={"/authors"} className={buttonVariants({ variant: "default" })}>
        К авторам
      </Link>
    </main>
  )
}
