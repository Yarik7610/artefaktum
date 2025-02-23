"use client"

import { updateCollection } from "@/app/_actions/collectionActions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { CreatorFormSchema, CreatorFormSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Collection, Tag } from "@prisma/client"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { SubmitFormBtn } from "../btns/submitFormBtn"
import { PreviewUploadImgs } from "../previewUploadImgs/previewUploadImgs"
import { Button } from "../shadcn/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/select"
import { Textarea } from "../shadcn/textarea"
import { PreviewImg } from "./creatorForm"
import { DragDropInput } from "./dragDropInput"

interface UpdaterFormProps {
  tags: Tag[]
  collection: Collection
}

export const UpdaterForm: FC<UpdaterFormProps> = ({ tags, collection }) => {
  const [previewImgs, setPreviewImgs] = useState<PreviewImg[]>([])

  const tagsIds = tags.map((t) => t.id)

  const resetFiles = () => {
    form.setValue("files", [])
    setPreviewImgs([])
  }

  const removePreviewImg = (id: string) => {
    const filteredFiles = form.getValues("files").filter((f) => f.id !== id)
    form.setValue("files", filteredFiles)
    setPreviewImgs(previewImgs.filter((previewImg) => previewImg.id !== id))
  }

  const form = useForm<CreatorFormSchemaType>({
    resolver: zodResolver(CreatorFormSchema),
    defaultValues: {
      name: collection.name,
      description: collection.description ? collection.description : "",
      tag: String(tagsIds.find((id) => id === collection.tag_id) ? collection.tag_id : 1), //if tag will be deleted from db
      files: []
    }
  })

  const onSubmit = async (data: CreatorFormSchemaType) => {
    const validatedFields = CreatorFormSchema.safeParse(data)
    if (!validatedFields.success) {
      toast.error("Ошибка валидации формы")
      return
    }
    const formData = new FormData()
    formData.append("user_id", collection.user_id)
    formData.append("id", collection.id)
    formData.append("name", validatedFields.data.name)
    formData.append("tag", validatedFields.data.tag)
    formData.append("description", validatedFields.data.description)
    for (let i = 0; i < validatedFields.data.files.length; i++) {
      formData.append("files", validatedFields.data.files[i].file)
      formData.append("filesIds", validatedFields.data.files[i].id)
    }

    const result = await updateCollection(formData)
    if (result && result.error) toast.error(result.error)
  }

  const { isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col xl:flex-row gap-y-10 gap-x-20">
          <section className="w-full xl:w-[35%] flex flex-col gap-5 md:gap-10 my-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Введите название коллекции" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className="max-h-[250px]" placeholder="Введите описание коллекции" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Выберите тег:</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="mt-2">
                      <SelectTrigger aria-label="Tag option">
                        <SelectValue placeholder="Выберите тег" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[200px]">
                      {tags.map((opt) => (
                        <SelectItem key={opt.id} value={String(opt.id)}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="w-full xl:w-[65%]">
            <DragDropInput form={form} setPreviewImgs={setPreviewImgs} />
            <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-5 mt-5">
              <PreviewUploadImgs previewImgs={previewImgs} removePreviewImg={removePreviewImg} />
              {previewImgs.length > 0 && (
                <Button type="button" variant={"secondary"} onClick={resetFiles}>
                  Очистить буфер
                </Button>
              )}
            </div>
          </section>
        </div>
        <SubmitFormBtn isSubmitting={isSubmitting} className="mt-10 w-full md:w-[200px]">
          Изменить коллекцию
        </SubmitFormBtn>
      </form>
    </Form>
  )
}
