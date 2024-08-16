"use client"

import { getAcceptableExtensions } from "@/lib/utils"
import {
  allowedCollectionImageExtensions,
  CreatorFormSchema,
  CreatorFormSchemaType,
  ExtendedFile
} from "@/lib/zodSchemas"
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import { PreviewImg } from "./creatorForm"
import { FormControl, FormField, FormItem, FormMessage } from "./shadcn/form"
import { Input } from "./shadcn/input"

interface DragDropProps {
  form: UseFormReturn<CreatorFormSchemaType>
  setPreviewImgs: Dispatch<SetStateAction<PreviewImg[]>>
}

export const DragDropInput: FC<DragDropProps> = ({ form, setPreviewImgs }) => {
  const [drag, setDrag] = useState(false)

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      const files = Array.from(droppedFiles)
      const extendedFiles: ExtendedFile[] = files.map((file) => ({ file, id: uuidv4() }))

      const validationResult = CreatorFormSchema.shape.files.safeParse(extendedFiles)
      if (!validationResult.success) {
        toast.error(validationResult.error.issues[0].message)
        setDrag(false)
        return
      }
      createImgSrcs(extendedFiles)
      form.setValue("files", [...form.getValues("files"), ...extendedFiles])
      form.trigger("files") //revalidate to remove error message with minimum 1 file
      setDrag(false)
    }
  }, [])

  const createImgSrcs = useCallback((files: ExtendedFile[]) => {
    for (let file of files) {
      let reader = new FileReader()
      reader.onload = () => {
        let image = new Image()
        image.src = reader.result as string
        setPreviewImgs((prevImgs: PreviewImg[]) => [...prevImgs, { id: file.id, src: image.src }])
      }
      reader.readAsDataURL(file.file)
    }
  }, [])

  const acceptableImagesExtensions = getAcceptableExtensions(allowedCollectionImageExtensions)

  return (
    <div>
      <p className="mb-2">
        Разрешены файлы с расширениями: <span className="text-gray-500">{acceptableImagesExtensions}</span>
      </p>
      <div
        onDragEnter={handleDragEnter} //enter the draggable zone
        onDragOver={handleDragEnter} //refresh 100ms if in draggable zone
        onDragLeave={handleDragLeave} //leave draggable zone
        onDrop={handleDrop}
        className={`${
          drag ? "bg-gray-100" : "bg-transparent"
        } relative rounded-md h-[450px] border-2 border-primary border-dashed flex flex-col items-center justify-center gap-5`}>
        <div className="w-[90%] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-center">
          <p className="text-xl font-medium py-2">{drag ? "Отпустите файлы для загузки" : "Перетащите файлы сюда"}</p>
          <p className="text-gray-500">или нажмите по области, чтобы выбрать файлы вручную</p>
        </div>
        <FormField
          control={form.control}
          name="files"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="w-full h-full">
              <FormControl>
                <Input
                  {...fieldProps}
                  multiple={true}
                  className="w-full h-full opacity-0 cursor-pointer p-0"
                  placeholder="Выберите файлы"
                  type="file"
                  accept={acceptableImagesExtensions}
                  onChange={(e) => {
                    if (!e.target.files) return
                    const files = Array.from(e.target.files)
                    const extendedFiles: ExtendedFile[] = files.map((file) => ({
                      file,
                      id: uuidv4()
                    }))

                    const validationResult = CreatorFormSchema.shape.files.safeParse(extendedFiles)
                    if (!validationResult.success) {
                      toast.error(validationResult.error.issues[0].message)
                      return
                    }
                    createImgSrcs(extendedFiles)
                    e.target.value = "" //to clean browser data about last chosen image for repeating the same image if we chose only 1 image per time
                    onChange([...value, ...extendedFiles])
                  }}
                  title=""
                />
              </FormControl>
              <FormMessage className="my-2" />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
