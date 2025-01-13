'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'

import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/action-tooltip'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useModal } from '@/hooks/use-modal-store'

interface InfoPanelProps {
    boardId: string
}

const font = Poppins({
    subsets: ['latin'],
    weight: ['600'],
})

export const TabSeparator = () => {
    return <div className='text-neutral-300 px-1.5 '>|</div>
}

export const InfoPanel = ({ boardId }: InfoPanelProps) => {
    const { onOpen } = useModal()

    const data = useQuery(api.board.get, {
        id: boardId as Id<'boards'>,
    })

    if (!data) return <InfoPanelSkeleton />

    return (
        <div className='h-12 absolute top-2 left-2 bg-white rounded-md px-1.5 flex items-center shadow-md'>
            <ActionTooltip label='Go to board'>
                <Button asChild variant='board' className='px-2'>
                    <Link href='/'>
                        <Image src='/placeholders/logoipsum-3.svg' alt='Logo' width={40} height={40} />
                        <span className={cn('font-semibold text-xl ml-2 text-black', font.className)}>Euka Desgin</span>
                    </Link>
                </Button>
            </ActionTooltip>
            <TabSeparator />
            <Button
                variant='board'
                className='text-base font-normal px-2'
                onClick={() =>
                    onOpen('renameBoard', {
                        id: data._id,
                        title: data.title,
                    })
                }
            >
                {data.title}
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
