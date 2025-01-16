'use client'

import { Camera } from './types/canvas'
import { CursorsPresence } from './cursors/cursors-presence'
import { LayerPreview } from './layer/layer-preview'

interface DrawBoardProps {
    layerIds: readonly string[]
    camera: Camera
    onWheel: (e: React.WheelEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
    onPointerLeave: (e: React.PointerEvent) => void
    onPointerUp: (e: React.PointerEvent) => void
}

export const EukaDrawBoard = ({ layerIds, camera, onWheel, onPointerMove, onPointerLeave, onPointerUp }: DrawBoardProps) => {
    return (
        <main className='w-full h-full'>
            <svg
                width='100%'
                height='100%'
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`,
                    }}
                >
                    {layerIds.map(layerId => (
                        <LayerPreview key={layerId} id={layerId} onLayerPointerDown={() => {}} selectionColor={'#000'} />
                    ))}
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}
