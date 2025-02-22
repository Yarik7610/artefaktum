import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL
const emailSender = process.env.EMAIL_SENDER

export const sendVerificationEmail = async (email: string, token: string, type: "set" | "update") => {
  const confirmLink = `${domain}/verificate-email?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: emailSender!,
    subject: type === "set" ? "Колли. Подтверждение почты" : "Колли. Подтверждение новой почты для смены",
    html: `<p>Нажмите <a href="${confirmLink}">сюда</a>, чтобы подтвердить почту</p>`
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: emailSender!,
    subject: "Колли. Восстановление пароля",
    html: `<div><h1>Если это были не вы, то удалите данное сообщение!</h1>
    <p>Нажмите <a href="${resetLink}">сюда</a>, чтобы восстановить пароль</p><div>`
  })
}
