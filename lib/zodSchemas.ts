import { z } from "zod"

export const SignInFormSchema = z.object({
  password: z
    .string()
    .trim()
    .min(1, "Поле обязательно")
    .min(5, "Пароль должен быть 5 символов и более")
    .max(50, "Длина поля не более 50 символов"),
  email: z.string().min(1, "Поле обязательно").email("Введите валидную почту")
})
export type SignInFormSchemaType = z.infer<typeof SignInFormSchema>

export const SignUpFormSchema = z.object({
  name: z.string().trim().min(1, "Поле обязательно").max(50, "Длина поля не более 50 символов"),
  password: z
    .string()
    .trim()
    .min(1, "Поле обязательно")
    .min(5, "Пароль должен быть 5 символов и более")
    .max(50, "Длина поля не более 50 символов"),
  email: z.string().min(1, "Поле обязательно").email("Введите валидную почту")
})
export type SignUpFormType = z.infer<typeof SignUpFormSchema>

export const UsernameFormSchema = z.object({
  name: z.string().trim().min(1, "Поле обязательно").max(50, "Длина поля не более 50 символов")
})
export type UsernameFormSchemaType = z.infer<typeof UsernameFormSchema>

export const EmailFormSchema = z.object({
  email: z.string().min(1, "Поле обязательно").email("Введите валидную почту")
})
export type EmailFormSchemaType = z.infer<typeof EmailFormSchema>

export const PasswordFormSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, "Поле обязательно")
      .min(5, "Пароль должен быть 5 символов и более")
      .max(50, "Длина поля не более 50 символов"),
    newPassword: z
      .string()
      .min(1, "Поле обязательно")
      .min(5, "Пароль должен быть 5 символов и более")
      .max(50, "Длина поля не более 50 символов"),
    newPasswordRepeat: z
      .string()
      .min(1, "Поле обязательно")
      .min(5, "Пароль должен быть 5 символов и более")
      .max(50, "Длина поля не более 50 символов")
  })
  .refine((data) => data.newPassword === data.newPasswordRepeat, {
    message: "Пароли не совпадают",
    path: ["newPasswordRepeat"]
  })
export type PasswordFormSchemaType = z.infer<typeof PasswordFormSchema>

export const DescriptionFormSchema = z.object({
  description: z.string().trim().max(200, "Длина поля не более 200 символов")
})
export type DescriptionFormSchemaType = z.infer<typeof DescriptionFormSchema>

export interface ExtendedFile {
  file: File
  id: string
}
const ExtendedFileSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size > 0, "Файл не должен быть пустым"),
  id: z.string().uuid()
})

export const allowedCollectionImageExtensions = [".jpg", ".jpeg", ".webp", ".png"]
export const CreatorFormSchema = z.object({
  name: z.string().trim().min(1, "Поле обязательно").max(50, "Длина поля не более 50 символов"),
  description: z.string().trim().max(500, "Длина поля не более 500 символов"),
  tag: z.string(),
  files: z
    .array(ExtendedFileSchema)
    .min(1, `Загрузите хотя бы 1 файл типа ${allowedCollectionImageExtensions.join(", ")}`)
    .max(20, `Возможно максимум 20 файлов`)
    .refine(
      (files) => {
        return files.every((file) => {
          const extension = file.file.name.slice(file.file.name.lastIndexOf("."))
          return allowedCollectionImageExtensions.includes(extension.toLowerCase())
        })
      },
      {
        message: `Допустимые расширения файлов: ${allowedCollectionImageExtensions.join(", ")}`
      }
    )
})
export type CreatorFormSchemaType = z.infer<typeof CreatorFormSchema>

export const allowedAvatarImageExtensions = [".webp", ".png"]
export const AvatarFormSchema = z.object({
  file: z
    .instanceof(File)
    .nullish()
    .refine(
      (file) => {
        if (!file) return true
        const extension = file.name.slice(file.name.lastIndexOf("."))
        return allowedAvatarImageExtensions.includes(extension.toLowerCase())
      },
      {
        message: `Допустимые расширения файла: ${allowedAvatarImageExtensions.join(", ")}`
      }
    )
    .refine(
      (file) => {
        if (!file) return true
        return file.size > 0
      },
      {
        message: "Файл не должен быть пустым"
      }
    )
})
export type AvatarFormSchemaType = z.infer<typeof AvatarFormSchema>

export const RatingStarsSchema = z.object({
  value: z
    .number({ message: "Оценка должна быть числом" })
    .int({ message: "Оценка должна быть целым числом" })
    .min(0, { message: "Минимальное значение оценки - 0" })
    .max(5, { message: "Максимальная оценка - 5 баллов" })
})
export type RatingStarsSchemaType = z.infer<typeof RatingStarsSchema>

export const CommentFormSchema = z.object({
  text: z.string().trim().min(1, "Длина поля - минимум 1 символ").max(500, "Длина поля не более 500 символов")
})
export type CommentFormSchemaType = z.infer<typeof CommentFormSchema>

export const RequestResetPasswordForm = z.object({
  email: z.string().min(1, "Поле обязательно").email("Введите валидную почту")
})
export type RequestResetPasswordFormType = z.infer<typeof RequestResetPasswordForm>
