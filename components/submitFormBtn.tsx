"use client"

import { Loader2 } from "lucide-react"
import { FC } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "./shadcn/button"

interface SubmitFormBtnProps {
  children: React.ReactNode
  isSubmitting?: boolean
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export const SubmitFormBtn: FC<SubmitFormBtnProps> = ({ children, isSubmitting, className, variant }) => {
  const { pending } = useFormStatus()
  const pendingSource = isSubmitting !== undefined ? isSubmitting : pending

  return (
    <Button
      variant={variant ? variant : "default"}
      disabled={pendingSource}
      type="submit"
      className={className ? className : ""}>
      {pendingSource ? <Loader2 className="h-6 w-6 animate-spin" /> : children}
    </Button>
  )
}
