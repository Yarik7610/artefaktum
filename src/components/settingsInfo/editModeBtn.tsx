import { Dispatch, FC, SetStateAction } from "react"

interface EditModeBtnProps {
  setActiveRow: Dispatch<SetStateAction<number>>
  row: number
}

export const EditModeBtn: FC<EditModeBtnProps> = ({ setActiveRow, row }) => {
  return (
    <button
      onClick={() => setActiveRow(row)}
      className="text-primary sm:text-gray-500 text-right transition-colors hover:text-primary">
      Изменить
    </button>
  )
}
