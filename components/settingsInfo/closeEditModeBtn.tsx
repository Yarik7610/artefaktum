"use client"
import { Dispatch, FC, SetStateAction } from "react"
import { Button } from "../shadcn/button"

interface CloseSettingsEditingBtnProps {
  setActiveRow: Dispatch<SetStateAction<number>>
}
export const CloseEditModeBtn: FC<CloseSettingsEditingBtnProps> = ({ setActiveRow }) => {
  return (
    <Button onClick={() => setActiveRow(-1)} variant="outline" className="text-primary">
      Отменить
    </Button>
  )
}
