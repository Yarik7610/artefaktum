import { updateUsername } from "@/app/_actions/settingsActions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { SubmitFormBtn } from "@/components/submitFormBtn"
import { UsernameFormSchema, UsernameFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, FC, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { CloseSettingsEditingBtn } from "../closeSettingsEditingBtn"

interface EditUsernameRowProps {
  value: string | null | undefined
  setActiveRow: Dispatch<SetStateAction<number>>
}

export const EditUsernameRow: FC<EditUsernameRowProps> = ({ value, setActiveRow }) => {
  const form = useForm<UsernameFormSchemaType>({
    resolver: zodResolver(UsernameFormSchema),
    defaultValues: {
      name: value ? value : ""
    }
  })

  const onSubmit = async (data: UsernameFormSchemaType) => {
    const result = await updateUsername(data)
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Новое имя автора" className="w-full md:max-w-[300px] text-primary" {...field} />
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
