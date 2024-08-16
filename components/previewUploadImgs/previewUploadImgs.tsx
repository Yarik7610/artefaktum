import { FC } from "react"
import { PreviewImg } from "../creatorForm"
import { PreviewUploadImg } from "./previewUploadImg"

interface PreviewUploadImgsProps {
  previewImgs: PreviewImg[]
  removePreviewImg: (id: string) => void
}

export const PreviewUploadImgs: FC<PreviewUploadImgsProps> = ({ previewImgs, removePreviewImg }) => {
  return (
    <ul className="flex items-center gap-5 overflow-x-scroll py-5 px-3">
      {previewImgs.map((img) => (
        <PreviewUploadImg src={img.src} key={img.id} id={img.id} removePreviewImg={removePreviewImg} />
      ))}
    </ul>
  )
}
