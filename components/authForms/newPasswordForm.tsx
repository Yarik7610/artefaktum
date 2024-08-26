"use client"

import { resetPassword } from "@/app/_actions/authActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { NewPasswordFormSchema, NewPasswordFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { SubmitFormBtn } from "../submitFormBtn"

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { push } = useRouter()

  const [isVisible, setIsVisible] = useState(false)

  const form = useForm<NewPasswordFormSchemaType>({
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      newPasswordRepeat: ""
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: NewPasswordFormSchemaType) => {
    const result = await resetPassword(data, token!)
    if (result?.error) toast.error(result.error)
    else if (result?.message) toast.success(result?.message)
  }

  useEffect(() => {
    if (!token) {
      push("/sign-in")
    }
  }, [])

  return (
    <Form {...form}>
      <form className="w-full flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <legend className="text-3xl font-bold">Новый пароль</legend>
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pr-[45px]"
                    type={!isVisible ? "password" : "text"}
                    placeholder="Введите пароль"
                    {...field}
                  />
                  <button
                    type="button"
                    aria-label="Show password"
                    className="absolute top-[5px] right-2 bg-white w-[30px] h-[30px] flex justify-center items-center">
                    {!isVisible ? (
                      <Eye onClick={() => setIsVisible(true)} />
                    ) : (
                      <EyeOff onClick={() => setIsVisible(false)} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPasswordRepeat"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Введите пароль повторно" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitFormBtn isSubmitting={isSubmitting}>Подтвердить</SubmitFormBtn>
        <Link href={"/reset"} className="hover:underline text-center font-medium">
          К восстановлению пароля
        </Link>
      </form>
    </Form>
  )
}
