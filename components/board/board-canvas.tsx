'use client'

import { InfoPanel } from './info-panel'
import { ParticipantsPanel } from './participants-panel'
import { ToolbarPanel } from './toolbar-panel'

interface BoardCanvasProps {
    boardId: string
}

export const BoardCanvas = ({ boardId }: BoardCanvasProps) => {
    return (
        <main className='h-full w-full relative bg-neutral-100 touch-none'>
            <InfoPanel />
            <ParticipantsPanel />
            <ToolbarPanel />
        </main>
    )
}
