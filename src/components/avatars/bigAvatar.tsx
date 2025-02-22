import { USERS_AVATARS_FOLDER } from "@/lib/constants"
import Image from "next/image"
import { FC } from "react"

interface BigAvatarProps {
  src: string | null | undefined
}

export const BigAvatar: FC<BigAvatarProps> = ({ src }) => {
  return (
    <Image
      src={src ? `${USERS_AVATARS_FOLDER}` + "/" + src : "/defaultUserImage512x512.png"}
      alt="Big avatar"
      width={300}
      height={300}
      className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] object-cover rounded-full border"
    />
  )
}
