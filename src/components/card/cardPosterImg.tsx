import Image from "next/image"
import { FC } from "react"

interface CardPosterImgProps {
  src: string
}

export const CardPosterImg: FC<CardPosterImgProps> = ({ src }) => {
  return <Image src={src} alt="Card poster" height={250} width={350} className="block h-[250px] w-full object-cover" />
}
