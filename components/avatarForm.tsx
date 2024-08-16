"use client"

import { updateAvatar } from "@/app/_actions/settingsActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { AvatarFormSchema, AvatarFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { SubmitFormBtn } from "./submitFormBtn"

interface AvatarFormProps {
  acceptableExtensions: string
}
export const AvatarForm: FC<AvatarFormProps> = ({ acceptableExtensions }) => {
  const form = useForm<AvatarFormSchemaType>({
    resolver: zodResolver(AvatarFormSchema)
  })

  const onSubmit = async (data: AvatarFormSchemaType) => {
    const validatedField = AvatarFormSchema.safeParse(data)
    if (!validatedField.success) {
      toast.error("Ошибка валидации формы")
      return
    }

    const formData = new FormData()
    formData.append("file", validatedField.data.file ? validatedField.data.file : "")

    const result = await updateAvatar(formData)
    if (result?.error) {
      toast.error(result.error)
    }
  }

  const { isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5 flex-col justify-center">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...fieldProps}
                  className="w-[300px]"
                  placeholder="Изменить аватар"
                  type="file"
                  accept={acceptableExtensions}
                  onChange={(e) => {
                    if (!e.target.files) return
                    const file = e.target.files[0]
                    try {
                      AvatarFormSchema.parse({ file })
                      onChange(file)
                    } catch (error) {
                      if (error instanceof z.ZodError) {
                        toast.error(error.errors[0].message)
                        onChange(null)
                        e.target.value = "" //clear input
                        return
                      }
                    }
                  }}
                  title=""
                />
              </FormControl>
              <FormMessage className="my-2" />
            </FormItem>
          )}
        />
        <SubmitFormBtn isSubmitting={isSubmitting} className="w-[300px]">
          Подтвердить
        </SubmitFormBtn>
      </form>
    </Form>
  )
}
