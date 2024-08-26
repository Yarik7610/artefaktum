"use client"

import { updatePassword } from "@/app/_actions/settingsActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { SubmitFormBtn } from "@/components/submitFormBtn"
import { PasswordFormSchema, PasswordFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Dispatch, FC, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { CloseSettingsEditingBtn } from "../closeSettingsEditingBtn"

interface EditPasswordRowProps {
  setActiveRow: Dispatch<SetStateAction<number>>
}

export const EditPasswordRow: FC<EditPasswordRowProps> = ({ setActiveRow }) => {
  const [isVisible, setIsVisible] = useState(false)

  const form = useForm<PasswordFormSchemaType>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: ""
    }
  })

  const onSubmit = async (data: PasswordFormSchemaType) => {
    const result = await updatePassword(data)
    if (result?.error) {
      toast.error(result.error)
    } else {
      setActiveRow(-1)
      if (result?.message) toast.success(result.message)
    }
  }

  const { isSubmitting } = form.formState

  return (
    <div className="mt-5 md:mt-0 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    className="w-full md:max-w-[300px] text-primary"
                    placeholder="Старый пароль"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full md:max-w-[300px] text-primary">
                    <Input
                      className="pr-[45px]"
                      type={!isVisible ? "password" : "text"}
                      placeholder="Новый пароль"
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

                  {/* <Input type="password" placeholder="Новый пароль" {...field} /> */}
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
                  <Input
                    type="password"
                    className="w-full md:max-w-[300px] text-primary"
                    placeholder="Повторите новый пароль"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-5">
            <Link href={"/reset"} className="hover:underline font-medium text-primary ">
              Забыли пароль?
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <CloseSettingsEditingBtn setActiveRow={setActiveRow} />
            <SubmitFormBtn isSubmitting={isSubmitting} className="w-[150px]">
              Подтвердить
            </SubmitFormBtn>
          </div>
        </form>
      </Form>
    </div>
  )
}
