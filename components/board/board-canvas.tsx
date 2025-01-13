'use client'

import { useSelf } from '@/liveblocks.config'

import { InfoPanel } from './info-panel'
import { ToolbarPanel } from './toolbar-panel'
import { ParticipantsPanel } from './participants-panel'

interface BoardCanvasProps {
    boardId: string
}

export const BoardCanvas = ({ boardId }: BoardCanvasProps) => {
    const info = useSelf(me => me.info)
    console.log('BoardCanvas', info)

    return (
        <main className='h-full w-full relative bg-neutral-100 touch-none'>
            <InfoPanel />
            <ParticipantsPanel />
            <ToolbarPanel />
        </main>
    )
}
