export const AuthorLiSkeleton = () => {
  return (
    <li className="pointer-events-none sm:px-5 gap-5 w-full py-3 border-b grid items-center grid-cols-[40px_1fr_50px] sm:grid-cols-[40px_1fr_115px_50px] md:grid-cols-[40px_0.5fr_1fr_115px_50px] hover:bg-gray-100">
      <div className="rounded-full w-[40px] h-[40px] bg-gray-800/20" />
      <div className="bg-gray-800/20 h-5 rounded-md w-20" />
      <div className=" bg-gray-800/20 h-5 rounded-md w-40 hidden md:block" />
      <div className="bg-gray-800/20 h-5 rounded-md w-full hidden sm:block col-span-2" />
      <div className="block sm:hidden bg-gray-800/20 h-5 rounded-md" />
    </li>
  )
}
