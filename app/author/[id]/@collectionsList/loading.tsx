import { CardSkeleton } from "@/components/skeletons/cardSkeleton"

export default function AuthorCollectionsLoading() {
  return (
    <>
      <div className="pointer-events-none xl:w-[95%] ml-auto pt-5 sm:pt-0 pb-5 flex justify-between items-center flex-wrap flex-col-reverse sm:flex-row">
        <h2 className="text-2xl font-semibold py-5 xl:py-0 text-center">Список коллекций:</h2>
      </div>
      <ul className="xl:w-[95%] ml-auto flex gap-5 flex-wrap justify-items-center justify-center pointer-events-none">
        {new Array(6).fill(0).map((c, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </ul>
    </>
  )
}
