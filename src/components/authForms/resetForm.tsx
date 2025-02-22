"use client"

import { requestResetPassword } from "@/app/_actions/authActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { RequestResetPasswordFormSchema, RequestResetPasswordFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { SubmitFormBtn } from "../btns/submitFormBtn"

interface ResetFormProps {
  defaultEmail: string | ""
}
export const ResetForm: FC<ResetFormProps> = ({ defaultEmail }) => {
  const form = useForm<RequestResetPasswordFormSchemaType>({
    resolver: zodResolver(RequestResetPasswordFormSchema),
    defaultValues: {
      email: defaultEmail
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: RequestResetPasswordFormSchemaType) => {
    const result = await requestResetPassword(data)
    if (result?.error) toast.error(result.error)
    else if (result?.message) toast.info(result?.message)
  }

  return (
    <Form {...form}>
      <form className="w-full flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <legend className="text-3xl font-bold">Восстановление пароля</legend>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Введите почту" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitFormBtn isSubmitting={isSubmitting}>Отправить письмо</SubmitFormBtn>
        {defaultEmail ? (
          <Link href={"/settings"} className="hover:underline text-center font-medium">
            К настройкам
          </Link>
        ) : (
          <Link href={"/sign-in"} className="hover:underline text-center font-medium">
            К авторизации
          </Link>
        )}
      </form>
    </Form>
  )
}
