"use client"

import { signUp } from "@/app/_actions/authActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { SignUpFormSchema, SignUpFormType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { SubmitFormBtn } from "../btns/submitFormBtn"

export const SignUpForm = () => {
  const [isVisible, setIsVisible] = useState(false)

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: SignUpFormType) => {
    const result = await signUp(data)
    if (!result.error) toast.info(result.message)
    else toast.error(result.error)
  }

  return (
    <Form {...form}>
      <form className="w-full flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <legend className="text-3xl font-bold">Создайте аккаунт</legend>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Введите имя автора" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <SubmitFormBtn isSubmitting={isSubmitting}>Зарегистрироваться</SubmitFormBtn>
        <p className="text-center text-gray-500">
          Уже есть аккаунт?{" "}
          <span className="font-medium text-primary">
            <Link href={"/sign-in"} className="hover:underline">
              Войти
            </Link>
          </span>
        </p>
      </form>
    </Form>
  )
}
