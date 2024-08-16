import Image from "next/image"
import { FC } from "react"
import blackBg from "../../public/blackBg.png"

interface CardPosterImgProps {
  src: string | null
}
export const CardPosterImg: FC<CardPosterImgProps> = ({ src }) => {
  return (
    <Image
      src={src ? src : blackBg}
      alt="Card poster"
      height={250}
      width={350}
      className="block h-[250px] w-full object-cover"
    />
  )
}
