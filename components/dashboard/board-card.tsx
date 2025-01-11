'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'

import { BoardCardOverlay } from './board-card-overlay'
import { BoardCardFooter } from './board-card-footer'

interface BoardCardProps {
    key: string
    id: string
    title: string
    imageUrl: string
    authorId: string
    authorName: string
    createdAt: number
    orgId: string
    isFavorites: boolean
}

export const BoardCard = ({ id, title, imageUrl, authorId, authorName, createdAt, orgId, isFavorites }: BoardCardProps) => {
    const { userId } = useAuth()

    const authorLabel = userId === authorId ? 'You' : authorName
    const createAtLabel = formatDistanceToNow(createdAt, { addSuffix: true })

    return (
        <Link href={`/board/${id}`}>
            <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
                <div className='relative flex-1 bg-amber-50'>
                    <Image src={imageUrl} alt={title} fill className='object-fit' />
                    <BoardCardOverlay />
                </div>
                <BoardCardFooter
                    title={title}
                    authorLabel={authorLabel}
                    createAtLabel={createAtLabel}
                    disabled={false}
                    isFavorites={isFavorites}
                    onClick={() => {}}
                />
            </div>
        </Link>
    )
}
