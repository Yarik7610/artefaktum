import { SignUpForm } from "@/components/authForms/signUpForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Страница регистрации"
}

export default async function LoginPage() {
  return <SignUpForm />
}
