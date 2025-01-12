'use client'

import { useQuery } from 'convex/react'
import { useOrganization } from '@clerk/nextjs'
import { toast } from 'sonner'

import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { Empty } from '@/components/empty'
import { BoardCard } from '@/components/dashboard/board-card'
import { NewBoardButton } from '@/components/dashboard/new-board-button'

interface ServerOrgListProps {
    orgId: string
    query: {
        search?: string
        favorites?: string
    }
}

export const ServerOrgList = ({ orgId, query }: ServerOrgListProps) => {
    const { search, favorites } = query
    const { organization } = useOrganization()

    // use convex db
    const { mutate, pending } = useApiMutation(api.board.create)

    const data = useQuery(api.boards.get, {
        orgId,
        ...query,
    })

    const handleCreated = () => {
        if (!organization) return

        mutate({
            orgId: organization.id,
            title: 'Untitled',
        })
            .then(() => {
                toast.success('Board created successfully!')
                // TODO: Redirect to board/{id}
            })
            .catch(e => {
                toast.error('Failed to create board: ' + e.message)
            })
    }

    if (data === undefined) {
        return (
            <div className='w-full h-full'>
                <h2 className='text-3xl'>{favorites ? `favorites boards` : `Team Boards`}</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
                    <NewBoardButton orgId={orgId} disabled={true} />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                </div>
            </div>
        )
    }

    // TODO: update different status icons or images
    if (!data.length && search) {
        return (
            <div className='w-full h-full'>
                <Empty
                    type='defaultEmpty'
                    title='Search Organizations'
                    imgUrl='/file.svg'
                    description={`No organizations found for search query: ${search}`}
                />
            </div>
        )
    }

    if (!data.length && favorites) {
        return (
            <div className='w-full h-full'>
                <Empty
                    type='defaultEmpty'
                    title='favorites Organizations'
                    imgUrl='/file.svg'
                    description={`No organizations found for favorites`}
                />
            </div>
        )
    }

    if (!data.length) {
        return (
            <div className='w-full h-full'>
                <Empty
                    type='teamEmpty'
                    title='Organizations List'
                    imgUrl='/file.svg'
                    description={`No organizations found at all`}
                    btnTitle='Create Boards'
                    disabled={pending}
                    handle={handleCreated}
                />
            </div>
        )
    }

    return (
        <div>
            <h2 className='text-3xl'>{favorites ? `favorites boards` : `Team Boards`}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
                <NewBoardButton orgId={orgId} disabled={false} />
                {data?.map(board => (
                    <BoardCard
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageUrl={board.imageUrl}
                        authorId={board.authorId}
                        authorName={board.authorName}
                        createdAt={board._creationTime}
                        orgId={board.orgId}
                        isFavorites={board.isFavorite}
                    />
                ))}
            </div>
        </div>
    )
}
