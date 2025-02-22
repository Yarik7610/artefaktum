import { ImageSkeleton } from "@/components/skeletons/imageSkeleton"

export default function CollectionImagesLoading() {
  return (
    <ul className="xl:w-[95%] ml-auto flex flex-wrap justify-evenly gap-5 ">
      {new Array(6).fill(0).map((_, id) => (
        <ImageSkeleton key={id} />
      ))}
    </ul>
  )
}
