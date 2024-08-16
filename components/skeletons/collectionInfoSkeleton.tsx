import { Separator } from "../shadcn/separator"

export const CollectionInfoSkeleton = () => {
  return (
    <aside className="md:w-[70%] md:mx-auto xl:w-[300px] py-5 pointer-events-none">
      <div className="flex flex-col gap-5">
        <div className="bg-gray-800/20 h-5 rounded-md w-full" />
        <div className="bg-gray-800/20 h-5 rounded-md w-full" />
      </div>
      <div className="flex justify-between pt-9 pb-5">
        <div className="bg-gray-800/20 h-5 rounded-full w-36" />
        <div className="bg-gray-800/20 h-5 rounded-md w-24" />
      </div>
      <Separator />
      <section className="py-5">
        <div className="bg-gray-800/20 h-5 rounded-md w-[60%]" />
        <div className="flex justify-between items-center mt-8">
          <div className="bg-gray-800/20 h-5 rounded-md w-32" />
          <div className="bg-gray-800/20 h-8 rounded-md w-28" />
        </div>
      </section>
      <Separator />
      <div className="mt-5 bg-gray-800/20 h-10 rounded-md w-full" />
    </aside>
  )
}
