import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL
const emailSender = process.env.EMAIL_SENDER

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/verificate-email?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: emailSender!,
    subject: "Подтвердите свою почту",
    html: `<p>Нажмите <a href="${confirmLink}">сюда</a>, чтобы подтвердить почту</p>`
  })
}
