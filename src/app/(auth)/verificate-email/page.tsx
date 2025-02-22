import { auth } from "@/auth"
import { VerificateEmailForm } from "@/components/authForms/verificationForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Подтверждение почты",
  description: "Страница подтверждения почты"
}

export default async function VerificateEmailPage() {
  const session = await auth()
  return <VerificateEmailForm session={session} />
}
