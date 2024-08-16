import { CardSkeleton } from "@/components/skeletons/cardSkeleton"

export default function CollectionsListLoading() {
  return (
    <ul className="lg:w-[95%] ml-auto flex gap-5 flex-wrap justify-items-center justify-center pointer-events-none">
      {new Array(6).fill(0).map((c, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </ul>
  )
}
