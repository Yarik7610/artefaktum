import { updateDescription } from "@/app/_actions/settingsActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Textarea } from "@/components/shadcn/textarea"
import { SubmitFormBtn } from "@/components/submitFormBtn"
import { DescriptionFormSchema, DescriptionFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, FC, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { CloseSettingsEditingBtn } from "../closeSettingsEditingBtn"

interface EditDescriptionRowProps {
  value: string | null | undefined
  setActiveRow: Dispatch<SetStateAction<number>>
}

export const EditDescriptionRow: FC<EditDescriptionRowProps> = ({ value, setActiveRow }) => {
  const form = useForm<DescriptionFormSchemaType>({
    resolver: zodResolver(DescriptionFormSchema),
    defaultValues: {
      description: value ? value : ""
    }
  })

  const onSubmit = async (data: DescriptionFormSchemaType) => {
    const result = await updateDescription(data)
    if (result?.error) {
      toast.error(result.error)
    } else setActiveRow(-1)
  }

  const { isSubmitting } = form.formState

  return (
    <div className="mt-5 md:mt-0 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Новое описание"
                    className="resize-none max-w-[300px] h-[150px] overflow-auto text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
