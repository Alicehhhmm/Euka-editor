'use client'

import Image from 'next/image'
import { Poppins } from 'next/font/google'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

interface InfoPanelProps {
    boardId: string
}

const font = Poppins({
    subsets: ['latin'],
    weight: ['600'],
})

export const InfoPanel = ({ boardId }: InfoPanelProps) => {
    const data = useQuery(api.board.get, {
        id: boardId as Id<'boards'>,
    })

    if (!data) return <InfoPanelSkeleton />

    return (
        <div className='h-12 absolute top-2 left-2 bg-white rounded-md px-1.5 flex items-center shadow-md'>
            <Button className='px-2'>
                <Image src='/placeholders/logoipsum-3.svg' alt='Logo' width={40} height={40} />
            </Button>
        </div>
    )
}

export const InfoPanelSkeleton = () => {
    return (
        <div className='h-12 w-[300px] absolute top-2 left-2 bg-white rounded-md px-1.5 flex items-center shadow-md'>
            <Skeleton className='h-full w-full bg-muted-400' />
        </div>
    )
}
