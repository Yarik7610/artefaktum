import { updatePassword } from "@/app/_actions/settingsActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { SubmitFormBtn } from "@/components/submitFormBtn"
import { PasswordFormSchema, PasswordFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Dispatch, FC, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { CloseSettingsEditingBtn } from "../closeSettingsEditingBtn"

interface EditPasswordRowProps {
  setActiveRow: Dispatch<SetStateAction<number>>
}

export const EditPasswordRow: FC<EditPasswordRowProps> = ({ setActiveRow }) => {
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
                    autoComplete="on"
                    type="password"
                    className="max-w-[300px] text-primary"
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
                  <Input
                    autoComplete="on"
                    type="password"
                    className="max-w-[300px] text-primary"
                    placeholder="Новый пароль"
                    {...field}
                  />
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
                    autoComplete="on"
                    type="password"
                    className="max-w-[300px] text-primary"
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
