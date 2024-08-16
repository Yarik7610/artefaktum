export const CardSkeleton = () => {
  return (
    <li className="w-[300px] 2xl:w-[350px] border flex flex-col rounded-md overflow-hidden animate-pulse pointer-events-none">
      <div className="h-[250px] w-full bg-gray-800/20"></div>
      <section className="p-5">
        <div className="flex items-center">
          <div className="bg-gray-800/20 h-5 rounded-full w-36" />
          <div className="bg-gray-800/20 h-5 rounded-md ml-auto w-16" />
        </div>
        <div className="bg-gray-800/20 h-14 rounded-md w-full mt-10" />
        <div className="mt-10 flex items-end">
          <div className="bg-gray-800/20 h-5 rounded-md w-24" />
          <div className="bg-gray-800/20 h-5 rounded-md ml-auto w-12" />
        </div>
      </section>
    </li>
  )
}
