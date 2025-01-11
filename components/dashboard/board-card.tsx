'use client'

import Link from 'next/link'
import Image from 'next/image'

import { BoardCardOverlay } from './board-card-overlay'

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
    return (
        <Link href={`/board/${id}`}>
            <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
                <div className='relative flex-1 bg-amber-50'>
                    <Image src={imageUrl} alt={title} fill className='object-fit' />
                    <BoardCardOverlay />
                </div>
            </div>
        </Link>
    )
}
