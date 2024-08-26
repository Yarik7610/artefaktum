import { auth } from "@/auth"
import { NewPasswordForm } from "@/components/authForms/newPasswordForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Новый пароль",
  description: "Страница для создания нового пароля"
}

export default async function NewPasswordPage() {
  const session = await auth()
  return <NewPasswordForm session={session} />
}
