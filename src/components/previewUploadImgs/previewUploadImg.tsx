import { X } from "lucide-react"
import Image from "next/image"
import { FC } from "react"

interface PreviewUploadImgProps {
  id: string
  src: string
  removePreviewImg: (id: string) => void
}

export const PreviewUploadImg: FC<PreviewUploadImgProps> = ({ id, src, removePreviewImg }) => {
  return (
    <li className="relative min-w-[80px] w-[80px] h-[80px]">
      <button
        type="button"
        onClick={() => removePreviewImg(id)}
        aria-label="Remove image"
        className="bg-gray-100 md:bg-white absolute top-0 left-0  w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors hover:bg-gray-200">
        <X />
      </button>
      <Image
        src={src}
        alt="Preview image"
        width={80}
        height={80}
        className="w-full h-full rounded-md object-cover select-none pointer-events-none"
      />
    </li>
  )
}
