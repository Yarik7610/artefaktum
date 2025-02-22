import { USERS_AVATARS_FOLDER } from "@/lib/constants"
import Image from "next/image"
import { FC } from "react"

interface AvatarProps {
  src: string | null | undefined
}

export const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src ? `${USERS_AVATARS_FOLDER}` + "/" + src : "/defaultUserImage64x64.png"}
      alt="Avatar"
      width={300}
      height={300}
      className="w-[40px] h-[40px] rounded-full object-cover select-none pointer-events-none border"
    />
  )
}
