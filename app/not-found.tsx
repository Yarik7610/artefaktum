import { buttonVariants } from "@/components/shadcn/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="w-[85%] sm:w-[80%] mx-auto h-[calc(100vh-80px)] flex flex-col gap-y-5 items-center justify-center max-w-[1920px]">
      <h1 className="text-2xl font-semibold text-center">Cтраница не найдена</h1>
      <Link href={"/"} className={buttonVariants({ variant: "default" })}>
        На главную
      </Link>
    </main>
  )
}
