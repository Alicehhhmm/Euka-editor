'use client'

import { useState } from 'react'

import { useSelf, useHistory, useCanUndo, useCanRedo } from '@/liveblocks.config'
import { CanvasState, CanvasMode } from '@/types/canvas'

import { InfoPanel } from './info-panel'
import { ToolbarPanel } from './toolbar-panel'
import { ParticipantsPanel } from './participants-panel'

interface BoardCanvasProps {
    boardId: string
}

export const BoardCanvas = ({ boardId }: BoardCanvasProps) => {
    // 画板-操作记录
    const hsitory = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    // 画板状态
    const [CanvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    })

    const info = useSelf(me => me.info)
    console.log('BoardCanvas', info)

    return (
        <main className='h-full w-full relative bg-neutral-100 touch-none'>
            <InfoPanel boardId={boardId} />
            <ParticipantsPanel />
            <ToolbarPanel
                canvasState={CanvasState}
                setCanvasState={setCanvasState}
                undo={() => {}}
                redo={() => {}}
                canUndo={canUndo}
                canRedo={canRedo}
            />
        </main>
    )
}
