'use client'

import { Camera } from './types/canvas'
import { CursorsPresence } from './cursors/cursors-presence'
import { LayerPreview } from './layer/layer-preview'

interface DrawBoardProps {
    layerIds: readonly string[]
    camera: Camera
    selectionColor: Record<string, string>
    onWheel: (e: React.WheelEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
    onPointerLeave: (e: React.PointerEvent) => void
    onPointerUp: (e: React.PointerEvent) => void
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
}

export const EukaDrawBoard = ({
    layerIds,
    camera,
    selectionColor,
    onWheel,
    onPointerMove,
    onPointerLeave,
    onPointerUp,
    onLayerPointerDown,
}: DrawBoardProps) => {
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
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={selectionColor[layerId]}
                        />
                    ))}
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}
