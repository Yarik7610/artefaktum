"use client"

import { Dispatch, FC, SetStateAction } from "react"
import { EditModeBtn } from "../editModeBtn"
import { EditUsernameRow } from "./editUsernameRow"

interface UsernameRowProps {
  value: string | null | undefined
  row: number
  activeRow: number
  setActiveRow: Dispatch<SetStateAction<number>>
}

export const UsernameRow: FC<UsernameRowProps> = ({ value, row, activeRow, setActiveRow }) => {
  return (
    <li
      className={`${
        activeRow === row ? "bg-gray-100 md:grid-cols-[250px_1fr]" : "md:grid-cols-[250px_1fr_100px]"
      } grid p-5 border-b text-gray-500 `}>
      <p className="text-left text-primary">Имя автора</p>
      {activeRow === row ? (
        <EditUsernameRow value={value} setActiveRow={setActiveRow} />
      ) : (
        <p className="text-left truncate">{value}</p>
      )}
      {activeRow !== row && <EditModeBtn setActiveRow={setActiveRow} row={row} />}
    </li>
  )
}
