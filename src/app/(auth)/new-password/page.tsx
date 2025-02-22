import { NewPasswordForm } from "@/components/authForms/newPasswordForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Новый пароль",
  description: "Страница для создания нового пароля"
}

export default async function NewPasswordPage() {
  return <NewPasswordForm />
}
