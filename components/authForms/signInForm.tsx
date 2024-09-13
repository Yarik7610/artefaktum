"use client"

import { signInAction } from "@/app/_actions/authActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { SignInFormSchema, SignInFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { SubmitFormBtn } from "../btns/submitFormBtn"

export const SignInForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: SignInFormSchemaType) => {
    const result = await signInAction(data)
    if (result?.error) {
      if (result.type === "info") toast.info(result.error)
      else toast.error(result.error)
    }
  }

  return (
    <Form {...form}>
      <form className="w-full flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <legend className="text-3xl font-bold">Войдите в аккаунт</legend>
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
        <FormField
          control={form.control}
          name="password"
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
        <Link href={"/reset"} className="hover:underline font-medium">
          Забыли пароль?
        </Link>
        <SubmitFormBtn isSubmitting={isSubmitting}>Войти</SubmitFormBtn>
        <p className="text-center text-gray-500">
          Нет аккаунта?{" "}
          <span className="font-medium text-primary">
            <Link href={"/sign-up"} className="hover:underline">
              Зарегистрироваться
            </Link>
          </span>
        </p>
      </form>
    </Form>
  )
}
