"use client"
import { User } from "@prisma/client"
import { FC, useState } from "react"
import { DescriptionRow } from "./descriptionRow.tsx/descriptionRow"
import { EmailRow } from "./emailRow/emailRow"
import { PasswordRow } from "./passwordRow/passwordRow"
import { UsernameRow } from "./usernameRow/usernameRow"

interface SettingsInfoProps {
  user: User | null
}

export const SettingsInfo: FC<SettingsInfoProps> = ({ user }) => {
  const [activeRow, setActiveRow] = useState(-1)

  return (
    <section>
      <h1 className="font-bold text-2xl sm:px-5 text-center sm:text-start">Информация об аккаунте:</h1>
      <ul className="mt-10">
        <UsernameRow value={user?.name} activeRow={activeRow} setActiveRow={setActiveRow} row={0} />
        <DescriptionRow value={user?.description} activeRow={activeRow} setActiveRow={setActiveRow} row={1} />
        <EmailRow value={user?.email} activeRow={activeRow} setActiveRow={setActiveRow} row={2} />
        <PasswordRow activeRow={activeRow} setActiveRow={setActiveRow} row={3} />
      </ul>
    </section>
  )
}
