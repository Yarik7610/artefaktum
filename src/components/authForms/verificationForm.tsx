"use client"

import { verificateEmailAction } from "@/app/_actions/authActions"
import { Session } from "next-auth"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { FC, useCallback, useEffect, useState } from "react"
import { Preloader } from "../prealoder"
import { buttonVariants } from "../shadcn/button"

interface VerificationFormProps {
  session: Session | null
}
export const VerificateEmailForm: FC<VerificationFormProps> = ({ session }) => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { push } = useRouter()

  const [success, setSucess] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const onSubmit = useCallback(() => {
    if (!token) {
      push("/sign-in")
      return
    }
    verificateEmailAction(token, session?.user?.id)
      .then((data) => {
        setSucess(data.message)
        setError(data.error)
      })
      .catch(() => setError("Произошла ошибка"))
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <form className="w-full flex flex-col items-center rounded-md">
      <legend className="text-2xl font-bold text-center">{!session ? "Подтверждаем почту" : "Меняем почту"}</legend>
      {!success && !error && <p className="text-gray-500 mt-5">Пожалуйста, подождите</p>}
      {!success && !error && <Preloader />}
      {error && <p className="py-5 text-center text-red-500">{error}</p>}
      {success && <p className="py-5 text-center text-green-500">{success}</p>}
      {!session ? (
        <Link href={"/creator"} className={`w-[175px] ${buttonVariants({ variant: "default" })}`}>
          К авторизации
        </Link>
      ) : (
        <Link href={"/settings"} className={`w-[175px] ${buttonVariants({ variant: "default" })}`}>
          К настройкам
        </Link>
      )}
    </form>
  )
}
