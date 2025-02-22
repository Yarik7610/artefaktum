import { auth } from "@/auth"
import { ResetForm } from "@/components/authForms/resetForm"
import prisma from "@/lib/db"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Восстановление пароля",
  description: "Страница для восстановления пароля"
}

export default async function ResetPasswordPage() {
  const session = await auth()
  let defaultEmail = ""

  if (session) {
    const existingUser = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      select: {
        email: true
      }
    })

    if (existingUser) defaultEmail = existingUser.email
  }

  return <ResetForm defaultEmail={defaultEmail} />
}
