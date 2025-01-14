'use client'

import { CursorsPresence } from './cursors/cursors-presence'

interface DrawBoardProps {
    onWheel: (e: React.WheelEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
}

export const EukaDrawBoard = ({ onWheel, onPointerMove }: DrawBoardProps) => {
    return (
        <main className='w-full h-full bg-[seagreen]'>
            <svg width='100%' height='100%' onWheel={onWheel} onPointerMove={onPointerMove}>
                <g>
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}
