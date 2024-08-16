import { Separator } from "../shadcn/separator"

export const AuthorInfoSkeleton = () => {
  return (
    <aside className="xl:w-[300px] flex flex-col gap-5 animate-pulse pointer-events-none">
      <div className="flex justify-center xl:justify-start">
        <div className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] rounded-full bg-gray-800/20" />
      </div>
      <div className="bg-gray-800/20 h-5 rounded-md w-full" />
      <div className="bg-gray-800/20 h-5 rounded-md w-full" />
      <div className="bg-gray-800/20 h-5 rounded-md w-40" />
      <Separator />
      <div className="flex justify-between items-center">
        <div className="bg-gray-800/20 h-5 rounded-md w-32" />
        <div className="bg-gray-800/20 h-8 rounded-md w-28" />
      </div>
    </aside>
  )
}
