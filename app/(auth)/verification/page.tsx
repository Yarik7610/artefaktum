import { auth } from "@/auth"
import { VerificationForm } from "@/components/authForms/verificationForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Подтверждение почты",
  description: "Страница подтверждения почты"
}

export default async function VerificationPage() {
  const session = await auth()
  return <VerificationForm session={session} />
}
