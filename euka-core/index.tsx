'use client'

import { CursorsPresence } from './cursors/cursors-presence'

interface DrawBoardProps {
    onWheel: (e: React.WheelEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
    onPointerLeave: (e: React.PointerEvent) => void
}

export const EukaDrawBoard = ({ onWheel, onPointerMove, onPointerLeave }: DrawBoardProps) => {
    return (
        <main className='w-full h-full'>
            <svg width='100%' height='100%' onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
                <g>
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}
