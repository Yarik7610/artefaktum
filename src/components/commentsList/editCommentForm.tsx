"use client"

import { updateComment } from "@/app/_actions/commentActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Textarea } from "@/components/shadcn/textarea"
import { CommentFormSchema, CommentFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { SubmitFormBtn } from "../btns/submitFormBtn"
import { Button } from "../shadcn/button"

interface EditCommentFormProps {
  commentId: string
  collectionId: string
  currentText: string
  closeEditMode: () => void
}
export const EditCommentForm: FC<EditCommentFormProps> = ({ commentId, collectionId, closeEditMode, currentText }) => {
  const { push } = useRouter()
  const form = useForm<CommentFormSchemaType>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      text: currentText
    }
  })

  const onSubmit = async (data: CommentFormSchemaType) => {
    const result = await updateComment(data, commentId)
    if (result?.error) {
      toast.error(result?.error)
    } else if (result?.message) {
      toast.success(result?.message)
      form.reset()
      closeEditMode()
      push(`/collection/${collectionId}`)
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
        <div className="flex flex-wrap justify-end gap-3 items-center">
          <Button variant={"outline"} type="button" onClick={closeEditMode}>
            Отмена
          </Button>
          <SubmitFormBtn className="w-[110px]" isSubmitting={isSubmitting}>
            Изменить
          </SubmitFormBtn>
        </div>
      </form>
    </Form>
  )
}
