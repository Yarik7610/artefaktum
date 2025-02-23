import { Header } from "@/components/header/header"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Добро пожаловать!",
  description: "Вступительная страница"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-[2560px] mx-auto`}>
        <Header />
        {children}
        <ToastContainer autoClose={10000} />
      </body>
    </html>
  )
}

