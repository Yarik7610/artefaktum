import { SearchParamsType } from "@/app/collections/@collectionsList/page"
import { auth } from "@/auth"
import { AddCommentForm } from "@/components/comments/addCommentForm"
import { CommentsList } from "@/components/comments/commentsList"
import { Pagination } from "@/components/pagination"
import { COMMENTS_PAGE_SIZE } from "@/lib/constants"
import prisma from "@/lib/db"

export type ExtendedComment = {
  user: {
    name: string
    image: string | null
  }
} & {
  id: string
  text: string
  created_at: Date
  updated_at: Date
  collection_id: string
  user_id: string
}

interface CommentsProps {
  params: { id: string }
  searchParams: SearchParamsType
}

export default async function Comments({ params, searchParams }: CommentsProps) {
  let page = Number(searchParams?.page) || 1
  if (page < 0) page = 1

  const totalCount = await prisma.comment.count({
    where: {
      collection_id: params.id
    }
  })

  const extendedComments: ExtendedComment[] = await prisma.comment.findMany({
    where: { collection_id: params.id },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    },
    orderBy: {
      updated_at: "desc"
    },
    skip: (page - 1) * COMMENTS_PAGE_SIZE,
    take: COMMENTS_PAGE_SIZE
  })

  const totalPages = Math.ceil(totalCount / COMMENTS_PAGE_SIZE)

  const session = await auth()

  return (
    <>
      <h2 className="text-2xl font-bold line-clamp-2">Комментарии:</h2>
      <AddCommentForm collectionId={params.id} />
      {totalCount === 0 && (
        <p className="text-lg flex items-center justify-center h-[100px]">Нет комментариев. Оставьте его первым!</p>
      )}
      {totalCount > 0 && page > totalPages && (
        <p className="text-lg flex items-center justify-center h-[100px]">Нет комментариев по данному запросу.</p>
      )}
      {totalCount > 0 && page <= totalPages && (
        <>
          <CommentsList extendedComments={extendedComments} session={session} />
          <Pagination currentPage={page} totalPages={totalPages} scroll={false} />
        </>
      )}
    </>
  )
}
