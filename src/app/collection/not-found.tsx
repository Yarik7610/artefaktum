import { buttonVariants } from "@/components/shadcn/button"
import Link from "next/link"

export default function CollectionNotFound() {
  return (
    <main className="w-[85%] sm:w-[80%] mx-auto h-[calc(100vh-80px)] flex flex-col gap-y-5 items-center justify-center">
      <h1 className="text-2xl font-semibold text-center">Данная коллекция не была найдена</h1>
      <Link href={"/collections"} className={buttonVariants({ variant: "default" })}>
        К коллекциям
      </Link>
    </main>
  )
}
