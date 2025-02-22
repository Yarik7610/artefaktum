"use client"

import { Dispatch, FC, SetStateAction } from "react"
import { EditModeBtn } from "../editModeBtn"
import { EditPasswordRow } from "./editPasswordRow"

interface PasswordRowProps {
  activeRow: number
  setActiveRow: Dispatch<SetStateAction<number>>
  row: number
}

export const PasswordRow: FC<PasswordRowProps> = ({ activeRow, setActiveRow, row }) => {
  return (
    <li
      className={`${
        activeRow === row ? "bg-gray-100 md:grid md:grid-cols-[250px_1fr]" : "flex flex-wrap justify-between"
      }  p-5 border-b text-gray-500`}>
      <p className="text-primary">Пароль</p>
      {activeRow === row ? (
        <EditPasswordRow setActiveRow={setActiveRow} />
      ) : (
        <EditModeBtn row={row} setActiveRow={setActiveRow} />
      )}
    </li>
  )
}
