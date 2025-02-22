import { AddCommentForm } from "@/components/commentsList/addCommentForm"
import { CommentLiSkeleton } from "@/components/skeletons/commentLiSkeleton"

export default function CollectionAsideLoading() {
  const fakeId = "fakeid"
  return (
    <div className="pointer-events-none">
      <h2 className="text-2xl font-bold line-clamp-2">Комментарии:</h2>
      <AddCommentForm collectionId={fakeId} />
      <ul className="mt-5">
        {new Array(5).fill(0).map((_, idx) => (
          <CommentLiSkeleton key={idx} />
        ))}
      </ul>
    </div>
  )
}
