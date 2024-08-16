import { COLLECTIONS_IMAGES_FOLDER } from "@/lib/constants"
import prisma from "@/lib/db"
import Image from "next/image"
import Link from "next/link"

export default async function ImagesList({ params }: { params: { id: string } }) {
  const images = await prisma.image.findMany({ where: { collection_id: params.id } })

  if (!images.length)
    return <h1 className="text-lg text-center h-[100px] xl:h-[350px] flex items-center justify-center">Картинок нет</h1>

  return (
    <ul className="max-h-[1000px] overflow-y-auto xl:w-[95%] ml-auto flex flex-wrap justify-evenly gap-5">
      {images.map((img) => (
        <li key={img.id}>
          <Link href={`${COLLECTIONS_IMAGES_FOLDER}/${img.src}`}>
            <Image
              src={`${COLLECTIONS_IMAGES_FOLDER}/${img.src}`}
              alt="Collection image"
              width={300}
              height={300}
              className="rounded-md border object-cover w-[300px] h-[300px] 2xl:w-[350px] 2xl:h-[350px]"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
