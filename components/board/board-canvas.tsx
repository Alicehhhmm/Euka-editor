'use client'

import { useCallback, useState } from 'react'

import { useSelf, useHistory, useCanUndo, useCanRedo, useMutation } from '@/liveblocks.config'
import { CanvasState, CanvasMode, Camera } from '@/types/canvas'

import { EukaDrawBoard } from '@/euka-core'
import { pointerEventToCanvasPoint } from '@/euka-core/_utils'

import { InfoPanel } from './info-panel'
import { ToolbarPanel } from './toolbar-panel'
import { ParticipantsPanel } from './participants-panel'

interface BoardCanvasProps {
    boardId: string
}

export const BoardCanvas = ({ boardId }: BoardCanvasProps) => {
    // 画板状态
    const [CanvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    })

    // 画板-相机状态
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

    // 画板-操作记录
    const hsitory = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    const onWheel = useCallback((e: React.WheelEvent) => {
        console.log('onWheel')
        setCamera(camera => {
            const { x, y } = camera
            return {
                x: x - e.deltaX,
                y: y - e.deltaY,
            }
        })
    }, [])

    // 画板-鼠标状态监听
    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault()

        const current = pointerEventToCanvasPoint(e, camera)
        console.log('onPointerMove', current)

        setMyPresence({
            cursor: current,
        })
    }, [])

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
            <EukaDrawBoard onWheel={onWheel} onPointerMove={onPointerMove} />
        </main>
    )
}
