import { SignInForm } from "@/components/authForms/signInForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Авторизация",
  description: "Страница авторизации"
}

export default function SignInPage() {
  return <SignInForm />
}
