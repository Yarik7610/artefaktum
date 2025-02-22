"use client"

import { createComment } from "@/app/_actions/commentActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Textarea } from "@/components/shadcn/textarea"
import { CommentFormSchema, CommentFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { SubmitFormBtn } from "../btns/submitFormBtn"

interface AddCommentFormProps {
  collectionId: string
}
export const AddCommentForm: FC<AddCommentFormProps> = ({ collectionId }) => {
  const form = useForm<CommentFormSchemaType>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      text: ""
    }
  })

  const onSubmit = async (data: CommentFormSchemaType) => {
    const result = await createComment(data, collectionId)
    if (result?.error) {
      toast.error(result?.error)
    } else if (result?.message) {
      toast.success(result?.message)
      form.reset()
    }
  }

  const { isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 my-5">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Текст комментария"
                  className="resize-y w-full max-h-[200px] text-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <SubmitFormBtn isSubmitting={isSubmitting} className="w-[130px]">
            Отправить
          </SubmitFormBtn>
        </div>
      </form>
    </Form>
  )
}
