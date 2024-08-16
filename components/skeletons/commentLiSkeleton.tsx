export const CommentLiSkeleton = () => {
  return (
    <li className="py-5 flex gap-5 w-full border-t">
      <div className="rounded-full w-[40px] h-[40px] bg-gray-800/20" />
      <div className="w-full">
        <div className="flex gap-x-5">
          <div className="w-full">
            <div className="text-lg text-primary font-semibold line-clamp-2 break-all">
              <div className="bg-gray-800/20 h-5 rounded-md w-[200px]" />
            </div>
            <div className=" bg-gray-800/20 h-5 mt-1 rounded-md w-24" />
          </div>
          <div className="bg-gray-800/20 h-5 rounded-md ml-auto w-12" />
        </div>
        <div className="mt-3 bg-gray-800/20 h-10 rounded-md" />
      </div>
    </li>
  )
}
